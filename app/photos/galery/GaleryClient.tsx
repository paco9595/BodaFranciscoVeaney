"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface Photo {
    id: string;
    imageUrl: string;
    uploaded_by: string;
}

interface GaleryClientProps {
    photos: Photo[];
}

export default function GaleryClient({ photos }: GaleryClientProps) {
    const [currentPhotos, setCurrentPhotos] = useState<Photo[]>(photos);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(photos.length === 20);
    const observer = useRef<IntersectionObserver | null>(null);

    const lastPhotoElementRef = useCallback((node: HTMLDivElement) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                fetchMorePhotos();
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, hasMore, currentPhotos.length]);

    const fetchMorePhotos = async () => {
        setIsLoading(true);
        try {
            const offset = currentPhotos.length;
            const res = await fetch(`/api/photos?limit=20&offset=${offset}`);
            const data = await res.json();

            if (data.photos && data.photos.length > 0) {
                setCurrentPhotos((prev) => [...prev, ...data.photos]);
                if (data.photos.length < 20) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching more photos", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (selectedPhotoIndex === null) return;

        if (e.key === "Escape") {
            setSelectedPhotoIndex(null);
        } else if (e.key === "ArrowRight") {
            setSelectedPhotoIndex((prev) => (prev! + 1) % currentPhotos.length);
        } else if (e.key === "ArrowLeft") {
            setSelectedPhotoIndex((prev) => (prev! - 1 + currentPhotos.length) % currentPhotos.length);
        }
    }, [selectedPhotoIndex, currentPhotos.length]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Prevenir scroll en el body cuando un modal esta abierto
    useEffect(() => {
        if (selectedPhotoIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedPhotoIndex]);

    if (currentPhotos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-[#f4eee6] shadow-inner flex items-center justify-center text-[#b59e7a] border border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-3 tracking-wide">La galería está vacía</h3>
                <p className="text-gray-500 font-light text-lg max-w-md mx-auto mb-8">
                    Aún no hay fotos compartidas. ¡Anímate y sé el primero en subir un momento especial de nuestra boda!
                </p>
                <a
                    href="/photos"
                    className="px-8 py-3.5 bg-[#b59e7a] hover:bg-[#a68f6a] text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg font-medium tracking-wide flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Subir una foto
                </a>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentPhotos.map((photo, index) => {
                    if (currentPhotos.length === index + 1) {
                        return (
                            <div
                                ref={lastPhotoElementRef}
                                key={photo.id}
                                className="relative aspect-square rounded-2xl overflow-hidden shadow-md bg-gray-100 group cursor-pointer"
                                onClick={() => setSelectedPhotoIndex(index)}
                            >
                                <img
                                    src={photo.imageUrl}
                                    alt={`Subida por ${photo.uploaded_by}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-white text-sm font-medium truncate">
                                        {photo.uploaded_by}
                                    </p>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={photo.id}
                                className="relative aspect-square rounded-2xl overflow-hidden shadow-md bg-gray-100 group cursor-pointer"
                                onClick={() => setSelectedPhotoIndex(index)}
                            >
                                <img
                                    src={photo.imageUrl}
                                    alt={`Subida por ${photo.uploaded_by}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-white text-sm font-medium truncate">
                                        {photo.uploaded_by}
                                    </p>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>

            {isLoading && (
                <div className="flex justify-center items-center py-8">
                    <svg className="animate-spin h-8 w-8 text-[#b59e7a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}

            {selectedPhotoIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedPhotoIndex(null)}
                >
                    <button
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-white p-2 rounded-full bg-black/50 hover:bg-white/20 transition-colors"
                        onClick={(e) => { e.stopPropagation(); setSelectedPhotoIndex(null); }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <button
                        className="absolute left-2 md:left-8 text-white p-3 rounded-full bg-black/50 hover:bg-white/20 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPhotoIndex((prev) => (prev! - 1 + currentPhotos.length) % currentPhotos.length);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <div
                        className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={currentPhotos[selectedPhotoIndex].imageUrl}
                            alt="Foto en grande"
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full">
                            <p className="text-white text-sm font-medium">
                                {currentPhotos[selectedPhotoIndex].uploaded_by}
                            </p>
                        </div>
                    </div>

                    <button
                        className="absolute right-2 md:right-8 text-white p-3 rounded-full bg-black/50 hover:bg-white/20 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPhotoIndex((prev) => (prev! + 1) % currentPhotos.length);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs mt-8">
                        {selectedPhotoIndex + 1} de {currentPhotos.length}
                    </div>
                </div>
            )}
        </>
    );
}
