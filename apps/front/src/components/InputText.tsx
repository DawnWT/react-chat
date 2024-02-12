import React, { useState } from "react";
import '../styles/InputText.css';

interface InputTextProps {
  onSubmit: (value: string) => void;
}

export const InputText: React.FC<InputTextProps> = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (inputValue.trim() !== "") {
                onSubmit(inputValue);
                setInputValue("");
            }
        }
      };

    return (
        <div>
            <textarea
                className="input-text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                rows={1}
            />
        </div>
    );
};
