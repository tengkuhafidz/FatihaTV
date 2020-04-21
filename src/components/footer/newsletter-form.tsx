import React, { useState, ReactElement } from "react";
import { addSubscriber } from "../../api/moosend";
import {
  ButtonEvent,
  FormEvent,
  InputEvent,
  GtagCategories
} from "../../models";
import { gtagEventClick } from "../../utils/gtag";

const NewsletterForm: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(true);

  const trackSubmission = (email: string, isSuccessful: boolean): void => {
    const event: string = isSuccessful
      ? "subscribe_success"
      : "subscribe_failure";

    gtagEventClick(event, {
      event_category: GtagCategories.Engagement,
      event_label: email
    });
  };

  const isValidEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailInput = (e: InputEvent): void => {
    setHasError(false);
    setUserEmail(e.target.value);
  };

  const handleSubmission = async (
    e: FormEvent | ButtonEvent
  ): Promise<void> => {
    e.preventDefault();
    const submittedEmail: string = userEmail;

    if (isValidEmail(submittedEmail)) {
      const subscriptionResult: boolean = await addSubscriber(submittedEmail);
      trackSubmission(submittedEmail, subscriptionResult);
      setIsSuccessful(subscriptionResult);
      setHasSubmitted(true);
      setUserEmail("");
    } else {
      setHasError(true);
    }
  };

  const renderSubscriptionResponseMessage = (): ReactElement => {
    if (isSuccessful) {
      return (
        <div
          className={`rounded-b text-gray-800 px-4 py-3 shadow-md border-t-4 border-teal-500 bg-teal-100 `}
        >
          <div>
            <p className="font-bold">Submission Successful!</p>
            <p className="text-sm">
              Thank you for joining to our newsletter.&nbsp;
              <span
                className="text-teal-500"
                onClick={(): void => setHasSubmitted(false)}
              >
                Submit again
              </span>
              .
            </p>
          </div>
        </div>
      );
    }
    return (
      <div
        className={`rounded-b text-gray-800 px-4 py-3 shadow-md border-t-4 border-red-500 bg-red-100 `}
      >
        <div>
          <p className="font-bold">Unexpected Error </p>
          <p className="text-sm">
            There was an error in submitting the form.&nbsp;
            <span
              className="text-teal-500"
              onClick={(): void => setHasSubmitted(false)}
            >
              Please try again
            </span>
            .
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      id="footer-subscribe"
      className="w-full md:w-3/4 lg:w-full mx-auto mt-4 lg:mt-0"
    >
      <h4 className="font-semibold text-xl mb-4 text-center lg:text-left">
        Join our Newsletter
      </h4>
      <p className="hidden lg:block text-gray-200">
        Get updated on beneficial content and our latest features
      </p>
      <div className="mt-4">
        <form
          className={`${hasSubmitted ? "hidden" : "block"}`}
          onSubmit={(e): Promise<void> => handleSubmission(e)}
        >
          <div className={`flex items-center `}>
            <input
              className={`bg-gray-200 rounded-l w-full py-2 lg:py-3 px-2 text-gray-800 leading-tight focus:outline-none focus:bg-white border-2 focus:border-teal-500 ${
                hasError ? "border-red-500" : "border-gray-200"
              }`}
              id="inline-full-name"
              type="email"
              placeholder="Your Email"
              onChange={(e): void => handleEmailInput(e)}
              value={userEmail}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 lg:py-2 px-2 rounded-r"
              type="button"
              onClick={(e): Promise<void> => handleSubmission(e)}
            >
              Subscribe
            </button>
          </div>
          <div>
            <p
              className={`text-red-500 text-sm italic mt-1 ${
                hasError ? "block" : "hidden"
              }`}
            >
              Please input a valid email address.
            </p>
          </div>
        </form>
        {hasSubmitted && renderSubscriptionResponseMessage()}
      </div>
    </div>
  );
};

export default NewsletterForm;
