
import { apiStatusCodes } from "@/constant";
import { getCourseBySlugFromDB } from "@/database";
import { Question } from "@/database/models/Questions/Questions";
import { DatabaseQueryResponseType } from "@/interfaces";
import { connectDB } from "@/middlewares";
import { sendAPIResponse } from "@/utils";
import mongoose, { Schema } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
export interface AddQuestionTypePayLoadProps {
  qn: string;
  ans: string;
  type: string;
};

//add To DB

export interface DBQn {
  _id: typeof Schema.Types.ObjectId;
  qn: string;
  ans: string;
  isOptional?: boolean;
  type: "ReactJs" | "NextJs" | "NodeJs"
}

const addAQnToDB = async (
  qn: AddQuestionTypePayLoadProps
): Promise<DatabaseQueryResponseType> => {
  try {
    const AddedQn = new Question(qn);
    await AddedQn.save();
    const res = await Question.find({ type: AddedQn.type }).sort({ _id: -1 });
    return { data: res };
  } catch (error) {
    return { error: 'Failed while adding questins' };
  }
};
// export async function DELETE(req: NextRequest) {
//   let reqBody = await req.json();
//   await connectDB()

//   if (reqBody.flag == 1) {
//     await Question.deleteOne({ _id: reqBody.id });
//   } else if (reqBody.flag == 2) {
//     await Question.deleteMany({ type: reqBody.type });
//   }
//   let result = await Question.find();
//   return NextResponse.json({
//     Status: "OK",
//     result: result,
//   });
// }
// export async function GET() {
//   await connectDB()

//   let result = await Question.find();
//   return NextResponse.json({
//     result: result,
//     status: "OK",
//   });
// }
// export async function POST(req: NextRequest) {
//   const reqBody: QuestionsType = await req.json();
//   await connectDB()
//   let question = new Question(reqBody);
//   let result = await question.save();
//   return NextResponse.json({
//     status: "OK",
//     data: result,
//   });
// }
const handleAddAQn = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const coursePayload = req.body as AddQuestionTypePayLoadProps;
    const { data, error } = await addAQnToDB(coursePayload);

    if (error)
      return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
        sendAPIResponse({
          status: false,
          message: 'Question not added',
          error,
        })
      );

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        data,
        message: 'Question added successfully',
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed while adding Question',
        error: error,
      })
    );
  }
};
//GET QNS;

const getAllQnsFromDB = async (type: string): Promise<DatabaseQueryResponseType> => {
  try {

    const questins: DBQn[] = type ? await Question.find({ type: type }).sort({ _id: -1 }) : await Question.find().sort({ _id: -1 });


    if (!questins) {
      return { error: 'questins not found' };
    }

    return { data: questins };
  } catch (error) {
    return { error: `Failed while fetching a questins ${error}` };
  }
};

const handleGetAllQns = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    // let allCoursesResponse: DBQn[] = [];

    // Fetch all courses
    const { data, error } =
      await getAllQnsFromDB(req.body.type);

    if (!data || error) {
      return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
        sendAPIResponse({
          status: false,
          message: 'Failed while fetching questions',
          error: error,
        })
      );
    }



    console.log(data);

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        data: data,
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed while fetching Question',
        error,
      })
    );
  }
};

const deleteQnFromDB = async (id: Schema.Types.ObjectId, type: string): Promise<DatabaseQueryResponseType> => {
  try {
    await Question.deleteOne({ _id: id });
    const result = Question.find({ type: type }).sort({ _id: -1 })
    return { data: result }
  } catch (error) {
    return { error: `Failed while fetching a questins ${error}` };
  }
}
const handleDeleteQn = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {

    const { data, error } =
      await deleteQnFromDB(req.body._id, req.body.type);

    if (!data || error) {
      return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
        sendAPIResponse({
          status: false,
          message: 'Failed while deleting question',
          error: error,
        })
      );
    }




    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        data: data,
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed while fetching Question',
        error,
      })
    );
  }
};



const getAQnFromDBById = async (
  qnId: string
): Promise<DatabaseQueryResponseType> => {
  try {
    const qn = await Question.findById(qnId);
    console.log('qn', qn, qnId);


    if (!qn) {
      return { error: 'Question not found' };
    }


    return { data: qn };
  } catch (error) {
    return { error: `Failed while fetching a Question ${error}` };
  }
};

const updateAQNInDB = async ({
  QnId,
  updatedData,
}: {
  QnId: string;
  updatedData: Partial<AddQuestionTypePayLoadProps>
}): Promise<DatabaseQueryResponseType> => {
  try {
    const updatedQn = await Question.findByIdAndUpdate(
      QnId,
      updatedData,
      { new: true }
    );

    if (!updatedQn) return { error: 'Qn does not exists' };

    const res = await Question.find({ type: updatedQn.type }).sort({ _id: -1 });
    return { data: res };
  } catch (error) {
    return { error: 'Failed while updating Qn' };
  }
};

const handleUpdateQn = async (
  req: NextApiRequest,
  res: NextApiResponse,
  QnId: string
) => {
  const updatedData = req.body as Partial<AddQuestionTypePayLoadProps>;

  const { error } = await getAQnFromDBById(QnId);

  if (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Question1 not found',
        error,
      })
    );
  }

  try {
    const { data, error } = await updateAQNInDB({
      QnId: QnId,
      updatedData: updatedData
    });
    if (error) {
      return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
        sendAPIResponse({
          status: false,
          message: 'Failed while updating course',
          error,
        })
      );
    }

    return res.status(apiStatusCodes.OKAY).json(
      sendAPIResponse({
        status: true,
        data,
      })
    );
  } catch (error) {
    return res.status(apiStatusCodes.INTERNAL_SERVER_ERROR).json(
      sendAPIResponse({
        status: false,
        message: 'Failed while updating course',
        error,
      })
    );
  }
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { method, query } = req;
  // const { QnId } = query as { QnId: string };

  switch (method) {
    case 'POST':
      return handleAddAQn(req, res)
    case "GET":
      console.log('get called', req.body);
      return handleGetAllQns(req, res);
    case 'DELETE':
      console.log(req.body, 'req DELETE');
      return handleDeleteQn(req, res);
    case 'PATCH':
      console.log(req.body, 'req patch');

      return handleUpdateQn(req, res, req.body._id);

    default:
      return res.status(apiStatusCodes.BAD_REQUEST).json(
        sendAPIResponse({
          status: false,
          message: `Method ${req.method} Not Allowed`,
        })
      );
  }
};

export default handler;
