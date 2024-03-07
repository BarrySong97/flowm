import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";
export default function ImportLoadingModal({
  onOpenChange,
  isOpen,
}: {
  onOpenChange: (v: boolean) => void;
  isOpen: boolean;
}) {
  return (
    <>
      <Modal
        isDismissable={false}
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex justify-center gap-1">
                导入数据中
              </ModalHeader>
              <ModalBody>
                <Spinner />
                <div className="text-center text-warning mt-2 text-small">
                  请勿关闭窗口，否者会导致数据导入缺失
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
