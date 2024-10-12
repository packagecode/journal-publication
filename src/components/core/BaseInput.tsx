import React from "react";
import { Col, Form, FormControlProps, InputGroup, Row } from "react-bootstrap";

export interface InputProps
  extends Omit<FormControlProps, "prefix" | "suffix"> {
  label?: string | React.ReactNode;
  id?: string;
  value: string | number | string[] | undefined;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  feedback?: string;
  required?: boolean;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  labelPosition?: "top" | "left" | "right" | "bottom";
  labelRow?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  value = "",
  name,
  onChange,
  feedback,
  required = false,
  prefix,
  suffix,
  labelPosition = "top",
  labelRow = 2,
  ...props
}) => {
  const defaultFeedback =
    required && !feedback ? `The ${name} field is required` : feedback;
  const renderLabel = (position: "top" | "left" | "right" | "bottom") => {
    if (!label) return null;
    const labelElement = (
      <Form.Label
        htmlFor={id ?? name}
        className={"form-label " + (required ? "text-danger" : "text-default")}
      >
        {label} {required && "*"}
      </Form.Label>
    );

    switch (position) {
      case "top":
        return <div>{labelElement}</div>;
      case "left":
        return <Col sm={labelRow}>{labelElement}</Col>;
      case "right":
        return (
          <Col sm={labelRow} className="text-end">
            {labelElement}
          </Col>
        );
      case "bottom":
        return <div className="mt-2">{labelElement}</div>;
      default:
        return null;
    }
  };

  // Determine if prefix is a string or React component
  const renderPrefix = () => {
    if (typeof prefix === "string") {
      return (
        <InputGroup.Text id={`${id ?? name}GroupPrepend`}>
          {prefix}
        </InputGroup.Text>
      );
    } else {
      return prefix; // Render as ReactNode directly
    }
  };

  // Determine if suffix is a string or React component
  const renderSuffix = () => {
    if (typeof suffix === "string") {
      return (
        <InputGroup.Text id={`${id ?? name}GroupAppend`}>
          {suffix}
        </InputGroup.Text>
      );
    } else {
      return suffix; // Render as ReactNode directly
    }
  };

  return (
    <Form.Group>
      {labelPosition === "top" && renderLabel("top")}
      <Row
        className={
          labelPosition === "left" || labelPosition === "right"
            ? "align-items-center"
            : ""
        }
      >
        {labelPosition === "left" && renderLabel("left")}
        <Col>
          <InputGroup hasValidation>
            {prefix && renderPrefix()}
            <Form.Control
              {...props}
              name={name}
              id={id ?? name}
              value={value ?? ""}
              onChange={onChange}
              aria-describedby={
                prefix
                  ? `${name}GroupPrepend`
                  : suffix
                  ? `${name}GroupAppend`
                  : undefined
              }
              required={required}
            />
            {suffix && renderSuffix()}
            {defaultFeedback && (
              <Form.Control.Feedback type="invalid">
                {defaultFeedback}
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Col>
        {labelPosition === "right" && renderLabel("right")}
      </Row>
      {labelPosition === "bottom" && renderLabel("bottom")}
    </Form.Group>
  );
};

export default Input;
