import cloudinary
  from "@/lib/cloudinary";

import {
  NextResponse,
} from "next/server";

export async function POST(
  req: Request
) {
  try {
    const formData =
      await req.formData();

    const file =
      formData.get(
        "file"
      ) as File;

    if (!file) {
      return NextResponse.json(
        {
          error:
            "No file",
        },
        {
          status: 400,
        }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(
        bytes
      );

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "elegant-design/videos",
          resource_type: "video",
          eager: [
            {
              format: "mp4",
            },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(buffer);
    });
const videoUrl =
  result.eager?.[0]?.secure_url ||
  result.secure_url;

return NextResponse.json({
  url: videoUrl,
  publicId:
    result.public_id,
});

  } catch (
    error
  ) {
    console.error(
      error
    );

    return NextResponse.json(
      {
        error:
          "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}