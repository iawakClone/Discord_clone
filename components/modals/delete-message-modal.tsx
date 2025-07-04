"use client";

import qs from "query-string";
import { useState } from "react";
import axios from "axios";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

export const DeleteMessageModal = () => {
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "deleteMessage";
    const { apiUrl, query } = data;


    const [isLoading, setIsloading] = useState(false);

    const onClick = async () => {
        try {
            setIsloading(true);
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            });

            await axios.delete(url);
            onClose();

        } catch (error) {
            console.log(error)
        } finally {
            setIsloading(false);
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-12 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Messages
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to delete the channel ? <br />
                        The message will be permanently deleted and cannot be recovered.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            variant="primary"
                            onClick={onClick}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

}