import { getMissingTranslation, getTranslate } from "localizationSlice";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

interface TranslateProps {
    id: string;
    children?: ReactNode;
}

const Translate = ({ id, children }: TranslateProps) => {
    const translate = useSelector(getTranslate);
    const missingTranslation = useSelector(getMissingTranslation);

    return <>{translate(id) ?? children ?? missingTranslation}</>;
};

export default Translate;
