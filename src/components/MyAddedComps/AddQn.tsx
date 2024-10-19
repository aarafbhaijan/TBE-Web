import React, { useState } from 'react';
import InputFieldContainer from './common/Form/InputFieldContainer';
import { Button } from '.';
import { useApi } from '@/hooks';
import { routes } from '@/constant';
import { AddQuestionTypePayLoadProps, DBQn } from '@/pages/api/v1/shikshaQns/qns';
import Qns from '@/pages/shiksha/explore/[Type]';

const AddQn = ({ type }: { type: string }) => {
    const [qn, setQn] = useState('');
    const { makeRequest } = useApi(routes.exploreQn(type));
    const [loading, setIsLoading] = useState(false)


    // Move useApi hook outside the AddQnToDB function

    const AddQnToDB = async () => {
        setIsLoading(true);
        try {


            await makeRequest({
                method: 'POST',
                url: routes.api.qns,
                body: {
                    ans: qn,
                    qn: qn,
                    type: type
                } as AddQuestionTypePayLoadProps,
            });


        } catch (error) {
            console.error('Error toggling chapter completion:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-fit my-auto">
            <InputFieldContainer
                label="Enter Your Question.."
                onChange={(e) => {
                    setQn(e); // Ensure you're using e.target.value for input value
                }}
                type="text"
                value={qn}
            />
            <div className="my-auto">
                <Button text="Add" isLoading={loading} className="my-auto" variant="PRIMARY" onClick={AddQnToDB} />
            </div>
        </div>
    );
};

export default AddQn;
