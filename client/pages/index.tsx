import {connect} from "react-redux";
import React, {useEffect} from "react";
import {useRouter} from "next/router";


function Home({user}) {
    const router = useRouter();

    useEffect(() => {
        if (!user || !user.login) {
            router.push('/login');
        } else if (user && user.role === 'seller') {
            router.push('/seller/'+user._id);
        } else if (user && user.role === 'buyer') {
            router.push('/buyer');
        } else if (user && user.role === 'admin') {
            router.push('/admin')
        }
    });

    return <></>;
}


const mapStateToProps = (state: any) => ({
    user: state.user
});

export default connect(mapStateToProps)(Home);