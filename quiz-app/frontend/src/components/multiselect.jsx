import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    maxHeight: "40px",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
    borderRadius: "0.375rem",
    border: "none",
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%",
    backgroundColor: "white",
    top: "15",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#e2e8f0",
    borderRadius: "0.375rem",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#1a202c",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#1a202c",
    ":hover": {
      backgroundColor: "#cbd5e0",
      color: "#2d3748",
    },
  }),
};

const MultiSelectInput = ({
  control,
  name,
  errors,
  students,
  selectedStudents,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = students?.map((user) => ({
    value: user._id,
    label: user.username,
  }));

  const allOption = { value: "all", label: "Select All" };

  const handleChange = (selected) => {
    if (selected?.some((option) => option.value === "all")) {
      const allSelectedOptions = options?.filter(
        (option) => option.value !== "all"
      );
      setSelectedOption(allSelectedOptions);
      selectedStudents(allSelectedOptions);
    } else {
      setSelectedOption(selected);
      selectedStudents(selected);
    }
  };

  const getCustomStyles = (error) => ({
    control: (provided) => ({
      ...provided,
      width: "100%",
      maxHeight: "40px",
      boxShadow:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      borderRadius: "0.375rem",
      border: error ? "1px solid red" : "none",
    }),
    menu: (provided) => ({
      ...provided,
      width: "100%",
      backgroundColor: "white",
      top: "15",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e2e8f0",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#1a202c",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#1a202c",
      ":hover": {
        backgroundColor: "#cbd5e0",
        color: "#2d3748",
      },
    }),
  });

  return (
    <>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              isSearchable
              value={selectedOption}
              onChange={(selected) => {
                handleChange(selected);
                field.onChange(selected);
              }}
              options={options ? [allOption, ...options] : []}
              styles={getCustomStyles(errors[name])}
              placeholder="Select Students"
            />
          )}
        />
        {errors[name] && (
          <p className="mx-2 text-red-500 text-[12px] pt-1">
            {errors[name].message}
          </p>
        )}
      </div>
    </>
  );
};

export default MultiSelectInput;
