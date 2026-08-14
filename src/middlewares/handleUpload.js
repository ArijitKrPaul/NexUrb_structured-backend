import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
import { upload, uploadPdf } from "./multer.middleware.js";

const handlePdfUpload = (req, res, next) => {
  uploadPdf.single("pdf")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        throw new ApiError(400, "File too large max 5MB allowed");
      }

      throw new ApiError(400, err.message);
    } else if (err) {
      throw new ApiError(400, err.message);
    }

    next();
  });
};
const handleImageUpload = (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(new ApiError(400, "File too large. Max 5MB allowed"));
      }

      return next(new ApiError(400, err.message));
    }

    if (err) {
      return next(new ApiError(400, err.message));
    }

    next();
  });
};

export { handleImageUpload, handlePdfUpload };
