import React from "react";
import { Button as MainButton, Spinner } from "react-bootstrap";
import { ButtonProps as BootstrapButtonProps } from "react-bootstrap/Button";

interface MainButtonProps extends BootstrapButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<MainButtonProps> = ({
  loading = false,
  children,
  ...props
}) => {
  return (
    <MainButton {...props} disabled={loading || props.disabled}>
      {loading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        children
      )}
    </MainButton>
  );
};

export default Button;
