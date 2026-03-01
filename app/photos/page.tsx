"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";


export default function PhotosPage() {
    const [selectedFiles, setSelectedFiles] = useState<{ file: File; preview: string }[]>([]);
    const [uploaderName, setUploaderName] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFilesAdded = (newFilesList: FileList | null | File[]) => {
        if (!newFilesList) return;

        const newArray = Array.from(newFilesList);
        if (newArray.length === 0) return;

        setStatus("idle");
        setErrorMessage("");

        const totalFilesNow = selectedFiles.length + newArray.length;
        if (totalFilesNow > 10) {
            setStatus("error");
            toast.error("Puedes seleccionar un máximo de 10 fotos a la vez.");
            setErrorMessage("Puedes seleccionar un máximo de 10 fotos a la vez.");
            return;
        }

        const validFiles: { file: File; preview: string }[] = [];

        for (const file of newArray) {
            if (!file.type.startsWith("image/")) {
                setStatus("error");
                toast.error(`Selección inválida. "${file.name}" no es una imagen.`);
                setErrorMessage("Algunos de los archivos seleccionados no son imágenes válidas.");
                return;
            }

            if (file.size > 15 * 1024 * 1024) {
                setStatus("error");
                toast.error(`La foto "${file.name}" pesa más de 15MB. ¡Inténtalo con una más ligera!`);
                setErrorMessage(`La foto "${file.name}" pesa más de 15MB. ¡Inténtalo con una más ligera!`);
                return;
            }

            validFiles.push({ file, preview: URL.createObjectURL(file) });
        }

        setSelectedFiles((prev) => [...prev, ...validFiles]);
    };

    const removeFile = (indexToRemove: number) => {
        setSelectedFiles((prev) => {
            const newList = [...prev];
            URL.revokeObjectURL(newList[indexToRemove].preview);
            newList.splice(indexToRemove, 1);
            return newList;
        });
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFilesAdded(e.dataTransfer.files);
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setStatus("uploading");

        try {
            // Primer paso: Pedir las URLs pre-firmadas
            const fileDataForUrls = selectedFiles.map(item => ({
                name: item.file.name,
                size: item.file.size,
                type: item.file.type
            }));

            const urlsResponse = await fetch('/api/photos/upload/singleUrl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    files: fileDataForUrls,
                    uploaderName: uploaderName.trim() || "Anonimo"
                }),
            });

            const urlsResult = await urlsResponse.json();

            if (!urlsResponse.ok || urlsResult.error) {
                setStatus("error");
                toast.error(urlsResult.error || "Error al obtener permisos de subida.");
                setErrorMessage(urlsResult.error || "Error al obtener permisos de subida.");
                return;
            }

            const { uploadUrls } = urlsResult;

            // Segundo paso: Subir cada archivo directamente usando su URL pre-firmada (PUT)
            const uploadPromises = selectedFiles.map(async (item, index) => {
                const urlData = uploadUrls[index];
                if (!urlData) throw new Error("Falta URL para uno de los archivos");

                const uploadResponse = await fetch(urlData.signedUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': item.file.type },
                    body: item.file,
                });

                if (!uploadResponse.ok) {
                    toast.error(`Error al subir imagen ${index + 1}.`);
                    throw new Error(`Error al subir imagen ${index + 1}`);
                }

                return uploadResponse;
            });

            await Promise.all(uploadPromises);

            // Tercer paso: Registrar los archivos subidos en la base de datos a través de tu endpoint
            const pathsToSave = uploadUrls.map((urlData: any) => `galeria_boda/${urlData.path}`);

            const metadataResponse = await fetch('/api/photos/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paths: pathsToSave,
                    uploadedBy: uploaderName.trim() || "Anonimo",
                    tableNumber: null
                }),
            });

            const metadataResult = await metadataResponse.json();

            if (!metadataResponse.ok || metadataResult.error) {
                console.error("Error al guardar la metadata:", metadataResult.error);
                // Puede que las fotos se hayan subido a Storage pero falló la BD
                toast.error("Fotos subidas, pero hubo un error al registrarlas. " + (metadataResult.error || ""));
            } else {
                toast.success("¡Fotos subidas con éxito!");
            }

            setStatus("success");
            setSelectedFiles([]);

        } catch (e: any) {
            console.error("Error al subir:", e);
            setStatus("error");
            toast.error(e.message || "Error de red o subida. Intenta de nuevo más tarde.");
            setErrorMessage("Error de red o subida. Intenta de nuevo más tarde.");
        }
    };

    const resetState = () => {
        setStatus("idle");
        selectedFiles.forEach(item => URL.revokeObjectURL(item.preview));
        setSelectedFiles([]);
        setUploaderName("");
        setErrorMessage("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#faf9f6] to-[#f4eee6]">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
                        Comparte tus Recuerdos
                    </h1>
                    <p className="text-lg text-gray-600 font-light max-w-xl mx-auto">
                        Sube tus fotos favoritas de la boda y ayúdanos a capturar cada momento especial. Las imágenes se guardarán en nuestro álbum digital.
                    </p>
                </div>

                <div
                    className={`relative bg-white/60 backdrop-blur-md border border-dashed rounded-4xl p-8 md:p-14 transition-all duration-300 ease-out shadow-sm hover:shadow-md
                        ${isDragging ? 'border-[#b59e7a] bg-[#faf8f5] shadow-inner scale-[1.01]' : 'border-gray-300'}
                        ${status === 'uploading' ? 'opacity-80 pointer-events-none' : ''}`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        ref={fileInputRef}
                        onChange={(e) => handleFilesAdded(e.target.files)}
                    />

                    {selectedFiles.length === 0 && status !== "success" && (
                        <div
                            className="flex flex-col items-center justify-center text-center cursor-pointer h-full min-h-[300px]"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="w-24 h-24 mb-8 flex items-center justify-center rounded-full bg-linear-to-br from-[#f4eee6] to-[#ede3d5] text-[#b59e7a] transition-transform duration-500 hover:scale-110 shadow-sm border border-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-medium text-gray-800 mb-2 tracking-wide">Toca para subir tu foto</h3>
                            <p className="text-gray-500 font-light text-lg">o arrastra y suelta tu archivo aquí</p>
                            <p className="text-[#b59e7a] text-sm mt-5 font-medium opacity-80 uppercase tracking-widest">(Solo imágenes, máx. 15MB, hasta 10 fotos)</p>
                        </div>
                    )}

                    {selectedFiles.length > 0 && status !== "success" && (
                        <div className="flex flex-col items-center">
                            <div className="w-full mb-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-medium text-gray-800 tracking-wide">
                                        Fotos seleccionadas ({selectedFiles.length}/10)
                                    </h3>
                                    {selectedFiles.length < 10 && (
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="text-sm font-semibold text-[#b59e7a] hover:text-[#998263] transition-colors flex items-center bg-[#f4eee6] px-4 py-2 rounded-full"
                                        >
                                            <span className="text-lg mr-1 leading-none">+</span> Agregar
                                        </button>
                                    )}
                                </div>

                                <div className={`grid gap-4 ${selectedFiles.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
                                    selectedFiles.length <= 4 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'
                                    }`}>
                                    {selectedFiles.map((item, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-md bg-gray-100 border-[3px] border-white">
                                            <img src={item.preview} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => removeFile(idx)}
                                                title="Quitar foto"
                                                className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-red-500 p-1.5 rounded-full hover:bg-red-50 hover:text-red-700 transition-colors shadow-md border border-black/5"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full mb-8 max-w-sm mx-auto">
                                <label htmlFor="uploaderName" className="block text-sm font-medium text-gray-700 mb-2 text-left ml-1">
                                    ¿Quién comparte estas fotos? <span className="text-gray-400 font-normal">(Opcional)</span>
                                </label>
                                <input
                                    type="text"
                                    id="uploaderName"
                                    placeholder="Ej. Familia Veaney, o Paco..."
                                    value={uploaderName}
                                    onChange={(e) => setUploaderName(e.target.value)}
                                    maxLength={40}
                                    className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#b59e7a] focus:border-[#b59e7a] outline-none transition-all shadow-sm bg-white placeholder-gray-400"
                                />
                            </div>

                            <button
                                onClick={handleUpload}
                                disabled={status === "uploading"}
                                className="w-full sm:w-auto px-12 py-4 bg-[#b59e7a] hover:bg-[#a68f6a] text-white rounded-full font-medium tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:hover:bg-[#b59e7a] disabled:hover:shadow-lg relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                                <span className="relative z-10 flex items-center">
                                    {status === "uploading" ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Guardando {selectedFiles.length > 1 ? "memorias" : "memoria"}...
                                        </>
                                    ) : (
                                        `Subir ${selectedFiles.length > 1 ? "Fotos" : "Foto"}`
                                    )}
                                </span>
                            </button>

                            {status === "error" && (
                                <div className="mt-6 p-4 w-full max-w-md bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-start shadow-sm mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 mt-0.5 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <p className="text-sm">{errorMessage}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {status === "success" && (
                        <div className="flex flex-col items-center text-center py-12 animate-in zoom-in-95 duration-700 fade-in">
                            <div className="w-28 h-28 mb-8 bg-linear-to-br from-[#f4eee6] to-[#e6dbcc] text-[#b59e7a] rounded-full flex items-center justify-center shadow-lg border-4 border-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#b59e7a]/10 animate-pulse"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-14 h-14 relative z-10 drop-shadow-sm">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-light text-gray-900 mb-5 tracking-wide">¡Una foto para el recuerdo!</h3>
                            <p className="text-lg text-gray-600 font-light mb-10 max-w-sm mx-auto leading-relaxed">
                                Esa memoria ya es parte de nuestro álbum especial. ¡Nos encanta que estés aquí compartiendo este día con nosotros!
                            </p>
                            <button
                                onClick={resetState}
                                className="px-10 py-3.5 rounded-full border-2 border-[#b59e7a] text-[#b59e7a] hover:bg-[#b59e7a] hover:text-white transition-all duration-300 font-medium tracking-wide shadow-sm hover:shadow-md"
                            >
                                Subir otra memoria
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
