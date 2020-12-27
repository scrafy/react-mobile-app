import React, { useEffect } from 'react';

const Error = ({ errorMessage }) => {

    return (
        <div>
            <p>{errorMessage}</p>
        </div>
    );
}

export async function getServerSideProps({ query }) {

    return { props: { errorMessage: query.error } };
}

export default Error;