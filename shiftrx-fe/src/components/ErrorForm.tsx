import { isErrorData, isFetchBaseQueryError } from "@/services/errors";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const ErrorForm = ({
  error,
}: {
  error: FetchBaseQueryError | SerializedError | undefined;
}) => {
  if (error && isFetchBaseQueryError(error) && isErrorData(error.data)) {
    return (
      <div className="mt-2">
        {Array.isArray(error.data.message) ? (
          error.data.message.map((message, index) => (
            <div key={index} className="mt-1">
              <span className="text-red-500 text-sm">{message}</span>
            </div>
          ))
        ) : (
          <span className="text-red-500 text-sm">{error.data.message}</span>
        )}
      </div>
    );
  }

  return null;
};

export default ErrorForm;
