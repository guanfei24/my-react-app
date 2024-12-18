import { useState } from "react";

export default function useDisclosure() {
  const [isOpen, setIsOpen] = useState(true);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(!isOpen);
  return { isOpen, onOpen, onClose, onToggle };
}
