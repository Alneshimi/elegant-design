"use client";

import { useEffect } from "react";

export default function VideoUploadHandler() {
  useEffect(() => {
    console.log("HANDLER LOADED");

    const form =
      document.getElementById(
        "productForm"
      ) as HTMLFormElement | null;

    if (!form) return;

    const handler = async (
      e: Event
    ) => {
      console.log(
        "SUBMIT HANDLER RUNNING"
      );

      const videoInput =
        document.getElementById(
          "videos"
        ) as HTMLInputElement | null;

      const hidden =
        document.getElementById(
          "uploadedVideos"
        ) as HTMLInputElement | null;

      const files =
        videoInput?.files;

      if (!hidden || !videoInput) {
        return;
      }

      console.log(files);

      if (
        !files ||
        files.length === 0
      ) {
        return;
      }

      e.preventDefault();

      const uploaded = [];

      for (const file of files) {
        const fd =
          new FormData();

        fd.append(
          "file",
          file
        );

        const res =
          await fetch(
            "/api/upload-video",
            {
              method: "POST",
              body: fd,
            }
          );

        const data =
          await res.json();

        uploaded.push(
          data
        );
      }

      console.log(uploaded);

      hidden.value =
        JSON.stringify(
          uploaded
        );

      console.log(
        hidden.value
      );

      videoInput.value =
        "";

      form.removeEventListener(
        "submit",
        handler
      );

      form.requestSubmit();
    };

    form.addEventListener(
      "submit",
      handler
    );

    return () => {
      form.removeEventListener(
        "submit",
        handler
      );
    };
  }, []);

  return null;
}