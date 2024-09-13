import clsx from "clsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { Product } from "@/model/product";

export interface CMSProductFormProps {
  activeItem: Partial<Product> | null;
  onClose: () => void;
}

const initialState: Partial<Product> = {
  name: "",
  cost: 0,
  description: "",
};

export function CMSProductForm(props: CMSProductFormProps) {
  const [formData, setFormData] = useState(initialState);

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    const name = e.currentTarget.value;
    setFormData((s) => ({ ...s, name }));
  }

  function saveHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
  }

  const isNameValid = formData.name?.length;
  const isValid = isNameValid;

  return (
    <div
      className={clsx(
        "fixed bg-slate-200 text-black z-10 top-0 w-96 h-full transition-all",
        {
          "-right-96": !props.activeItem,
          "right-0": props.activeItem,
        }
      )}
    >
      <form onSubmit={saveHandler}>
        <div className="flex justify-around h-16">
          <button
            type="submit"
            disabled={!isValid}
            className="text-white w-1/2 bg-green-500 hover:bg-green-600 disabled:opacity-60"
          >
            SAVE
          </button>
          <button
            type="button"
            onClick={props.onClose}
            className="text-white w-1/2 bg-slate-500 hover:bg-slate-600"
          >
            CLOSE
          </button>
        </div>

        <div className="flex flex-col gap-2 mx-4 mt-12 mb-4">
          Product Name:
          <input
            type="text"
            value={formData?.name}
            onChange={changeHandler}
            className={clsx({ error: !isNameValid })}
          />
        </div>
      </form>

      {props.activeItem?.name}
    </div>
  );
}
