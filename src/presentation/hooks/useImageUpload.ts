import { useState, useCallback, ChangeEvent } from 'react';

interface UseImageUploadReturn {
    imagePreview: string | null;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    clearPreview: () => void;
}

export const useImageUpload = (
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>
): UseImageUploadReturn => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];

            if (file) {
                if (!file.type.startsWith('image/')) {
                    alert('Por favor selecciona una imagen válida');
                    return;
                }

                if (file.size > 5 * 1024 * 1024) {
                    alert('La imagen no puede superar los 5MB');
                    return;
                }

                setFile(file);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        },
        [setFile]
    );

    const clearPreview = useCallback(() => {
        setImagePreview(null);
        setFile(undefined);
    }, [setFile]);

    return {
        imagePreview,
        handleFileChange,
        clearPreview,
    };
};