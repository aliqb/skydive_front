import { FormEvent } from "react";

interface  LabeledFileInputProps{
    accepFiles?: string;
    title: string;
    onChoose(file:FileList|File|null):void;
    multiple?:boolean
}
const LabeledFileInput : React.FC<LabeledFileInputProps> = ({accepFiles='',title, multiple=false, onChoose: onChoos})=>{

    function onChange(event: FormEvent){
        const files = (event.target as HTMLInputElement).files;
        onChoos(multiple ? files : (files && files[0]))
    }

    return (
        <div>
            <label htmlFor={title} className="text-blue-700 font-semibold cursor-pointer">
                بارگذاری فایل
            </label>
            <input type="file" id={title} className="hidden" accept={accepFiles} onChange={onChange} />
        </div>
    )
}

export default LabeledFileInput