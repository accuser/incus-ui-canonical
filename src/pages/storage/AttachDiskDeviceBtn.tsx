import { FC, ReactNode } from "react";
import { Button, ButtonProps } from "@canonical/react-components";
import usePortal from "react-useportal";
import { InstanceAndProfileFormikProps } from "components/forms/instanceAndProfileFormValues";
import AttachDiskDeviceModal from "./AttachDiskDeviceModal";
import { LxdDiskDevice } from "types/device";

interface Props {
  formik: InstanceAndProfileFormikProps;
  children: ReactNode;
  buttonProps?: ButtonProps;
  project: string;
  setValue: (device: LxdDiskDevice) => void;
}

const AttachDiskDeviceBtn: FC<Props> = ({
  formik,
  children,
  buttonProps,
  project,
  setValue,
}) => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const handleFinish = (device: LxdDiskDevice) => {
    setValue(device);
    closePortal();
  };

  return (
    <>
      <Button onClick={openPortal} type="button" hasIcon {...buttonProps}>
        {children}
      </Button>
      {isOpen && (
        <Portal>
          <AttachDiskDeviceModal
            formik={formik}
            project={project}
            onFinish={handleFinish}
            close={closePortal}
          />
        </Portal>
      )}
    </>
  );
};

export default AttachDiskDeviceBtn;
