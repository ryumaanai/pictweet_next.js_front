import { useForm } from 'react-hook-form';

interface TweetForm {
    text: string;
    image: string;
  }

interface TweetFormComponentProps {
    onSubmit: (data: TweetForm) => void;
    errorMessages: string[];
    initialData: TweetForm;
    disabled: boolean;
}

const TweetFormComponent = ({ onSubmit, errorMessages, initialData, disabled }: TweetFormComponentProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<TweetForm>({
        defaultValues: initialData
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {errorMessages.map((error, index) => (
                <div key={index} className="error-message">{error}</div>
            ))}

            <input
                type="text"
                {...register('image')}
                placeholder="Image Url"
            />
            {errors.image && <span className="error-message">{errors.image.message}</span>}

            <textarea
                {...register('text', { required: "Text can't be blank" })}
                placeholder="text"
                rows={10}
            />
            {errors.text && <span className="error-message">{errors.text.message}</span>}

            <input type="submit" value="SEND" disabled={disabled} />
        </form>
    );
};


export default TweetFormComponent;
