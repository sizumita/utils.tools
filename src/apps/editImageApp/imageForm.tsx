import { component$ } from "@builder.io/qwik";
import FormFileInput, { InputType } from "~/components/forms/formFileInput";
import FormSelect from "~/components/forms/formSelect";
import FormCheck from "~/components/forms/formCheck";
import { FormContainer } from "~/components/forms/appForm";
import FormIntValue from "~/components/forms/formIntValue";
import FormColor from "~/components/forms/formColor";
import { MagickFormat } from "@imagemagick/magick-wasm";
import FormStringValue from "~/components/forms/formStringValue";

export const formats: MagickFormat[] = [
    MagickFormat.Png,
    MagickFormat.Jpeg,
    MagickFormat.Gif,
    MagickFormat.Webp,
];

export default component$(() => {
    return (
        <>
            <FormFileInput type={InputType.Image} name={"input_image"} />
            <FormSelect
                name={"file_type"}
                title={"Output Image Type"}
                options={formats}
            />
            <FormStringValue
                name={"filename"}
                default={"output"}
                required={true}
                long={true}
            >
                File Name (No Extension)
            </FormStringValue>
            <FormCheck name={"resize"} label={"Resize"}>
                <p q:slot={"description"}>Resize the image.</p>
                <FormContainer>
                    <FormIntValue
                        label={"Resized Width"}
                        name={"resize_width"}
                        placeholder={"100"}
                        default={"100"}
                        min={1}
                    />
                    <FormIntValue
                        label={"Resized Height"}
                        name={"resize_height"}
                        placeholder={"100"}
                        default={"100"}
                        min={1}
                    />
                </FormContainer>
            </FormCheck>
            <FormCheck name={"crop"} label={"Crop Image"}>
                <p q:slot={"description"}>
                    Crop the image to the specified width and height.
                </p>
                <FormContainer>
                    <FormIntValue
                        label={"Start X (px)"}
                        name={"crop_x"}
                        placeholder={"50"}
                        default={"50"}
                        min={1}
                    />
                    <FormIntValue
                        label={"Start Y (px)"}
                        name={"crop_y"}
                        placeholder={"50"}
                        default={"50"}
                        min={1}
                    />
                </FormContainer>
                <FormContainer>
                    <FormIntValue
                        label={"Width (px)"}
                        name={"crop_width"}
                        placeholder={"100"}
                        default={"100"}
                        min={1}
                    />
                    <FormIntValue
                        label={"Height (px)"}
                        name={"crop_height"}
                        placeholder={"100"}
                        default={"100"}
                        min={1}
                    />
                </FormContainer>
            </FormCheck>
            <FormCheck name={"grayscale"} label={"Grayscale"}>
                <p q:slot={"description"}>Converts the image to grayscale.</p>
            </FormCheck>
            <FormCheck name={"border"} label={"Border"}>
                <p q:slot={"description"}>Add a border line to the image.</p>
                <FormContainer>
                    <FormColor name={"border_color"} label={"Border Color"} />
                    <FormIntValue
                        label={"Border Width (px)"}
                        name={"border_width"}
                        default={"2"}
                        min={1}
                    />
                </FormContainer>
            </FormCheck>
            <FormCheck name={"charcoal"} label={"Charcoal"}>
                <p q:slot={"description"}>
                    Make the image charcoal drawing style.
                </p>
            </FormCheck>
            <FormCheck name={"blur"} label={"Blur"}>
                <p q:slot={"description"}>Blur the image.</p>
            </FormCheck>
            <FormCheck name={"contrast"} label={"Contrast"}>
                <p q:slot={"description"}>
                    Increases the contrast of the image.
                </p>
            </FormCheck>
            <FormCheck name={"negate"} label={"Negate"}>
                <p q:slot={"description"}>Invert all colors in the image.</p>
            </FormCheck>
            <FormCheck name={"transparent"} label={"Transparent Color"}>
                <p q:slot={"description"}>
                    Makes the specified color and range of colors transparent.
                </p>
                <FormContainer>
                    <FormColor name={"transparent_color"} label={"Color"} />
                    <FormIntValue
                        label={"Range(%)"}
                        name={"transparent_range"}
                        placeholder={"10(%)"}
                        default={"10"}
                        min={0}
                        max={100}
                    />
                </FormContainer>
            </FormCheck>
        </>
    );
});
