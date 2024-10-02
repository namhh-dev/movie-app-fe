let apiRoot = '';

if(process.env.NODE_ENV === 'development'){
    apiRoot = process.env.REACT_APP_DEV_BACKEND_URL;
}

if(process.env.NODE_ENV === 'production'){
    apiRoot = process.env.REACT_APP_PRO_BACKEND_URL;
}

export const API_ROOT = apiRoot;