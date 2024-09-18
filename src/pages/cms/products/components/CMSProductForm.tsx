import clsx from "clsx";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Product } from "@/model/product";
import { useCloudinary } from "@/shared/index";

declare var cloudinary: any;
export interface CMSProductFormProps {
  activeItem: Partial<Product> | null;
  onClose: () => void;
  onAdd: (product: Partial<Product>) => void;
  onEdit: (product: Partial<Product>) => void;
}

const initialState: Partial<Product> = {
  name: "",
  cost: 0,
  description: "",
  img: "",
  tmb: "",
};

export function CMSProductForm(props: CMSProductFormProps) {
  const [formData, setFormData] = useState(initialState);
  const [dirty, setDirty] = useState<boolean>(false);

  const { openWidget } = useCloudinary();

  useEffect(() => {
    if (props.activeItem?.id) {
      setFormData({ ...props.activeItem });
    } else {
      setFormData(initialState);
    }
  }, [props.activeItem]);

  function changeHandler(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setFormData((s) => ({ ...s, [name]: value }));
    setDirty(true);
  }

  function saveHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (props.activeItem?.id) {
      props.onEdit(formData);
    } else {
      props.onAdd(formData);
    }
  }

  function uploadHandler() {
    openWidget().then((res) => {
      setFormData((s) => ({ ...s, ...res }));
    });
  }
  const isNameValid = formData.name?.length;
  const isCostValid = formData.cost! > 0;
  const isDescValid = formData.description?.length;
  const isValid = isNameValid && isCostValid && isDescValid;

  return (
    <div
      className={clsx(
        "fixed bg-slate-200 text-black z-10 top-0 w-96 h-full transition-all overflow-auto",
        {
          "-right-96": !props.activeItem,
          "right-0": props.activeItem,
        }
      )}
    >
      <form onSubmit={saveHandler}>
        <div className='flex justify-around h-16'>
          <button
            type='submit'
            disabled={!isValid}
            className='text-white w-1/2 bg-green-500 hover:bg-green-600 disabled:opacity-60'
          >
            SAVE
          </button>
          <button
            type='button'
            onClick={props.onClose}
            className='text-white w-1/2 bg-slate-500 hover:bg-slate-600'
          >
            CLOSE
          </button>
        </div>

        {formData.img && (
          <img src={formData.img} alt={formData.name} className='w-full' />
        )}

        <div className='flex flex-col gap-2 mx-4 mt-12 mb-4'>
          Product Name:
          <input
            type='text'
            name='name'
            value={formData?.name}
            onChange={changeHandler}
            className={clsx("py-2 px-2", { error: !isNameValid && dirty })}
          />
          Product Cost:
          <input
            type='number'
            name='cost'
            value={formData?.cost}
            onChange={changeHandler}
            className={clsx("py-2 px-2", { error: !isCostValid && dirty })}
          />
          Description:
          <textarea
            name='description'
            value={formData.description}
            onChange={changeHandler}
            className={clsx("py-2 px-2", { error: !isDescValid && dirty })}
          ></textarea>
          <button type='button' onClick={uploadHandler} className='btn primary'>
            UPLOAD IMAGE
          </button>
        </div>
      </form>

      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}
