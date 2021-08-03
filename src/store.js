import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from "./modules/admin/auth/authSlice";
import overviewReducer from "./modules/admin/overview/overviewSlice";
import funnelReducer from "./modules/admin/funnel/funnelSlice";
import partnerReducer from "./pages/partners/partnerSlice";
import usersReducer from "./pages/users/usersSlice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        overview: overviewReducer,
        funnel: funnelReducer,
        partner: partnerReducer,
        users: usersReducer
    },
})