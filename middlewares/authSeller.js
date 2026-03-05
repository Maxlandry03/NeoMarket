import prisma from "@/lib/prisma";

const authSeller = async(userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { store: true },
        });

        // no user or no associated store
        if (!user || !user.store) {
            return false;
        }

        // only approved stores are considered "sellers"
        if (user.store.status === "approved") {
            return user.store.id; // caller expects storeId
        }

        // reject pending/rejected stores
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default authSeller;