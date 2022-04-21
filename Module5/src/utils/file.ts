import fs from "fs";

export const deleteFile = async (fileName: string) => {
    try {
        // Verifica se o arquivo existe ou nao no diretorio passado
        await fs.promises.stat(fileName);
    } catch (error) {
        return;
    }

    // Remove o arquivo de fato do diretorio que foi passado
    await fs.promises.unlink(fileName);
};
