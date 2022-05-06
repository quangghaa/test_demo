import React, { useEffect, useState } from "react";
import { getListNoJwt } from "../../services/api";
import { CacheAns, IQA } from "../interface";
import Question from "./Question";

const GeneralTest = (props: any) => {

    // Fetch cache Redis
    const [cache, setCache] = useState([] as CacheAns[]);

    const [loading, setLoading] = useState(false);

    const toArray = (obj: any) => {
        let resultArray = Object.keys(obj).map(function(objInd) {
            // let person = obj[objInd];
            
            let ob = {
                key: objInd,
                value: obj[objInd]
            }
            // do something with person
            return ob;
        });
        return resultArray;
    }

    // console.log("IN GEN TEST: ", props.data);
    
    useEffect(() => {
        var arrReturn = [] as CacheAns[];

        let engArr = [] as CacheAns[];
        
        const getCache = async () => {
            setLoading(true);
            try {
                const res = await getListNoJwt('testpage/getcacheans');
                if(res) {
                    let arr = toArray(res.data)

                    if(Array.isArray(arr) && arr.length > 0) {
                        arr.map((item) => {
                            if(item.value.idTest === props.data.testId) {
                                engArr.push(item);
                            }
                        })
                    } else {
                        console.log("ArrReturn is not an Array");
                    }
                }
                setCache(engArr);
            } finally {
                setLoading(false);
            }
        }

        getCache();
        // console.log("Cache OUT: ", cache);
        // console.log("ARRAY: ", arrReturn);

    }, [])

    return (
        <ul className='list'>
            {Array.isArray(props.data.content) && props.data.content.length > 0 ?
                props.data.content.map((qa: IQA, i: any) => (
                    <Question index={i+1} testId={props.data.testId} canId={props.canId} id={qa.id} data={qa} cache={cache} type={props.type} />
                )) : <></>
            }
        </ul>
    )
}

export default GeneralTest;