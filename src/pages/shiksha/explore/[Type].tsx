'use client';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StyledComponentsRegistry from '@/components/MyAddedComps/AntdRegistry';
import EnterAnyLabelModal from '@/components/MyAddedComps/EnterAnyLabelModal';
import { clearVals } from '@/components/MyAddedComps/helperFuncs';
import QuestionsCards from '@/components/MyAddedComps/QuestionsCards';
import { routes } from '@/constant';
import { useApi, useAPIResponseMapper } from '@/hooks';
import { PrimaryCardWithCTAProps } from '@/interfaces';
import { DBQn } from '@/pages/api/v1/shikshaQns/qns';
import { mapCourseResponseToCard } from '@/utils';
import { Button, notification, Spin } from 'antd';
import { Model } from 'mongoose';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
export interface OptionsSelect {
    label: string;
    value: number | string;
}

export interface Feilds {
    label: string;
    type:
    | "text"
    | "select"
    | "search"
    | "password"
    | "bit"
    | "hidden"
    | "antSearch"
    | "OTP"
    | "small-text"
    | "small-select"
    | "date" | "ant-text";
    value: string;
    imported?: boolean;
    id: string;
    isError: boolean;
    regexPattern?: {
        onKey: RegExp;
        whole: RegExp;
    };
    strict?: boolean;
    options?: string[] | OptionsSelect[];
    labeDiffVal?: boolean;
    heavyRender?: boolean;
    clearData?: boolean;
    clearValue?: boolean;
    refName?: string;
    searchWithNoSpace?: boolean;
    maxDate?: string;
    minDate?: string;
}
export interface Question {
    qn: string;
    ans: string;
    type: string;
    _id?: string;
}

const Qns = () => {
    const type = useRouter().asPath?.split('/').pop();


    const type2 = usePathname()?.split('/').pop();
    // const { response, loading } = useApi('shiksha', {
    //     url: routes.api.qns,
    //     body: { type: type }
    // });
    const [CallAddQn, setCallAddQn] = useState<boolean | undefined>(false);
    const [questions, setQuestions] = useState()
    const [error, setError] = useState('')
    // useEffect(() => {
    //     setQuestions(response?.data)
    // }, [response?.data])
    const GetQnFromDB = async (body: { type: string }) => {
        setAddQnLoader(true);
        setQuestions(undefined)
        try {


            const { data, error } = await makeRequest({
                method: 'GET',
                url: routes.api.qns,
                body: body,
            });
            if (error) {
                setError('Error While Fetching Question');
                notification.error({ message: 'Error While Fetching Question' })
            }
            setQuestions(data)


        } catch (error) {
            console.error('Error ', error);
        } finally {
            setAddQnLoader(false);
            setCallAddQn(false);
            clearVals(AddFeild, setAddFeild)

        }
    };
    const getRef = useRef(false);
    useEffect(() => {
        if (type || type != '[Type]' && !getRef.current) {
            console.log('router', type);
            GetQnFromDB({ type: type! });
            getRef.current = true
        }
    }, [type])

    const { makeRequest } = useApi(routes.exploreQn(type!));
    const [addQnLoader, setAddQnLoader] = useState(false)
    const AddQnToDB = async (body: Question) => {
        setAddQnLoader(true);
        try {


            const { data, error } = await makeRequest({
                method: 'POST',
                url: routes.api.qns,
                body: body,
            });
            if (error) {
                setError('Error While Adding Question');
                notification.error({ message: 'Error While Adding Question' })
            }
            setQuestions(data)


        } catch (error) {
            console.error('Error ', error);
        } finally {
            setAddQnLoader(false);
            setCallAddQn(false);
            clearVals(AddFeild, setAddFeild)

        }
    };
    const UpdateQNDB = async (body: Question) => {
        setError('')
        setQuestions(undefined)
        setAddQnLoader(true);
        try {


            const { data, error } = await makeRequest({
                method: 'PATCH',
                url: routes.api.qns,
                body: body,
            });
            if (error) {
                setError('Error While Updating Question');
                notification.error({ message: 'Error While Updating Question' })
            }
            if (data) { setQuestions(data) }


        } catch (error) {
            console.error('Error ', error);
        } finally {
            setAddQnLoader(false);
            setCallAddQn(false);
            clearVals(AddFeild, setAddFeild)

        }
    };
    const DeleteQnFromDB = async (id: string) => {
        setError('')

        setAddQnLoader(true);
        try {
            const { data, error } = await makeRequest({
                method: 'DELETE',
                url: routes.api.qns,
                body: { _id: id },
                
            });
            if (error) {
                setError('Error While Deleting Question');
                notification.error({ message: 'Something went wrong...', placement: 'top' })
            }
            if (data) { setQuestions(data) }


        } catch (error) {
            console.error('Error ', error);
        } finally {
            setAddQnLoader(false);
            setCallAddQn(false);
            clearVals(AddFeild, setAddFeild)

        }
    };
    useEffect(() => {
        if (CallAddQn && type) {
            const req: Question = {
                qn: AddFeild[0].value,
                ans: AddFeild[1].value,
                type: type,
            };
            // call APi Here
            console.log("req", req);
            AddQnToDB(req)
        }
        if (CallAddQn == undefined) {
            setshowAddModal(false);
            setCallAddQn(false);
            clearVals(AddFeild, setAddFeild)
        }
    }, [CallAddQn]);


    const regexPattern = {
        onKey: /^[A-Za-z0-9\s.,&-?]*$/,
        whole: /^[A-Za-z0-9\s.,&-?]+$/,
    };

    const [showAddModal, setshowAddModal] = useState(false);
    const [AddFeild, setAddFeild] = useState<Feilds[]>([
        {
            id: "AddFeild",
            label: "Enter your question Please..",
            value: "",
            regexPattern: regexPattern,
            isError: false,
            type: "ant-text",
        },
        {
            id: "AddFeild",
            label: "Enter Answer",
            value: "",
            regexPattern: regexPattern,
            isError: false,
            type: "ant-text",
        },
    ]);

    async function updateQn(req: Question) {
        console.log(req, "update Req");
        UpdateQNDB(req)
    }
    async function deleteQn(_id: string) {
        console.log(_id, "update Req");
        DeleteQnFromDB(_id)
    };
    // if (A) {
    //     return <LoadingSpinner />;
    // };
    return (
        <div className={"w-full"}>
            {addQnLoader && <Spin fullscreen />}
            <StyledComponentsRegistry>
                <div className="ml-auto mb-2">
                    <EnterAnyLabelModal
                        width={400}
                        items={AddFeild}
                        setItems={setAddFeild}
                        buttonLabel="Proceed"
                        isCallApi={CallAddQn}
                        label="Enter your Question and"
                        mainLabel="Proceed "
                        setIsCallApi={setCallAddQn}
                        setShowModal={setshowAddModal}
                        showModal={showAddModal}
                    />
                    <div className='flex justify-center items-center'>
                        <Button
                            loading={addQnLoader}
                            type="primary"
                            onClick={() => {
                                setshowAddModal(true);
                            }}
                            icon={<FaPlus />}
                        >
                            Add
                        </Button>
                    </div>
                </div>
                <div className="h-[70vh] overflow-y-auto  scrollbar-setting py-5 w-[70%] mx-auto">
                    {type && <QuestionsCards
                        error={error}
                        type={type}
                        questions={questions!}
                        updateQn={updateQn}
                        deleteQn={deleteQn}
                    />}
                </div>
            </StyledComponentsRegistry>
        </div>
    )
}

export default Qns