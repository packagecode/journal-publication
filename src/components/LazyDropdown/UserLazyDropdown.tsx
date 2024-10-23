import React, { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import LazyDropdown, { LazyDropdownProps } from "./LazyDropdown";

interface UserLazyDropdownProps
  extends Omit<LazyDropdownProps, "endPoint" | "placeholder" | "resourceKey"> {
  endPoint?: string;
  resourceKey?: string;
  placeholder?: string;
}

const UserLazyDropdown: React.FC<UserLazyDropdownProps> = ({
  itemText = "name",
  itemSubText = "",
  itemValue = "id",
  endPoint = "users",
  resourceKey = "users",
  searchableKey = "q",
  landlord = false,
  addButton = false,
  apiVersion = 1,
  placeholder = "Select User",
  label = "User",
  name = "user",
  id,
  value,
  onClear,
  onChange,
  onRemoveTag,
  onClick,
  multiple = false,
  maxTagCount = "responsive",
  maxCount,
  suffixIcon,
  ...selectProps
}) => {
  const [changeEndPoint, setChangeEndPoint] = useState(endPoint);
  useEffect(() => {
    setChangeEndPoint(endPoint);
  }, [endPoint]);
  return (
    <Fragment>
      <LazyDropdown
        itemText={itemText}
        itemSubText={itemSubText}
        itemValue={itemValue}
        endPoint={changeEndPoint}
        resourceKey={resourceKey}
        searchableKey={searchableKey}
        landlord={landlord}
        addButton={addButton}
        apiVersion={apiVersion}
        placeholder={placeholder}
        label={label}
        id={id}
        value={value}
        onClear={onClear}
        onChange={onChange}
        onRemoveTag={onRemoveTag}
        onClick={onClick}
        multiple={multiple}
        maxTagCount={maxTagCount}
        maxCount={maxCount}
        suffixIcon={suffixIcon}
        {...selectProps}
      ></LazyDropdown>
    </Fragment>
  );
};

export default React.memo(UserLazyDropdown);
