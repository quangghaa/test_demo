import { useState, useEffect } from 'react';
import { getList, getOne, createOne, updateOne, deleteOne, getTotal } from '../services/api';

const useContentTypeList = (contentType, params) => {
    const [contentTypeList, setContentTypeList] = useState([]);

    const getListContentType = async (params) => {
        const res = await getList(contentType, params);
        if (res.data && res.data.length > 0) {
            setContentTypeList(res.data)
        }
    };

    useEffect(() => {
        getListContentType(params)
    }, [params]); // Problem???

    return {
        contentTypeList,
        getListContentType
    }
}

// Use in useQuery
const getListContentType = async (contentType, params) => {
    const res = await getList(contentType, params);
    if(res.data && res.data.length > 0) {
        return res.data;
    }
    return null;
}

const useContentTypeGetWithBody = (contentType, payload) => {
    const [contentTypeObj, setContentTypeObj] = useState({});

    const getContentType = async () => {
        const res = await createOne(contentType, payload);
        if (res.data) {
            setContentTypeObj(res.data)
        }
    };

    useEffect(() => {
        getContentType()
    }, []);

    return {
        contentTypeObj,
        getContentType
    }
}

const useContentTypeGetOne = (contentType, id) => {
    const [contentTypeObj, setContentTypeObj] = useState({});

    const getContentType = async () => {
        const res = await getOne(contentType, id);
        if (res.data) {
            setContentTypeObj(res.data)
        }
    };

    useEffect(() => {
        getContentType()
    }, []);

    return {
        contentTypeObj,
        getContentType
    }
}

const useContentTypeGetTotal = (contentType) => {
    const [contentTypeTotal, setContentTypeTotal] = useState(0);

    const getContentType = async () => {
        const res = await getTotal(contentType);
        if (res.data) {
            setContentTypeTotal(res.data)
        }
    };

    useEffect(() => {
        getContentType()
    }, []);

    return {
        contentTypeTotal,
        getContentType
    }
}

const useContentTypeCreate = (contentType) => {
    const [sendingData, setSendingData] = useState(false);
    const createContentType = async (payload) => {
        setSendingData(true);
        const res = await createOne(contentType, payload);
        setSendingData(false);
        return res
    };

    return {
        sendingData,
        createContentType
    }
}

const useContentTypeUpdate = (contentType, id) => {
    const [sendingData, setSendingData] = useState(false);
    const updateContentType = async (payload) => {
        setSendingData(true);
        const res = await updateOne(contentType, id, payload);
        setSendingData(false);
        return res
    };

    return {
        sendingData,
        updateContentType
    }
}

const useContentTypeDelete = (contentType) => {
    const [sendingData, setSendingData] = useState(false);
    const deleteContentType = async (id) => {
        setSendingData(true);
        const res = await deleteOne(contentType, id);
        setSendingData(false);
        return res
    };

    return {
        sendingData,
        deleteContentType
    }
}

export {
    useContentTypeList,
    getListContentType,
    useContentTypeGetOne,
    useContentTypeGetTotal,
    useContentTypeGetWithBody,
    useContentTypeCreate,
    useContentTypeUpdate,
    useContentTypeDelete,
    createContentType
  };
  