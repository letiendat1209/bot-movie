import PropTypes from 'prop-types';
import Sidebar from '~/components/SideBar';
import TopHeader from '~/components/TopHeader';
import "~/styles/components/Admin.css";
function AdminLayout({ children }) {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopHeader />
                
                {/* Content area with hidden scroll bar */}
                <div className="flex-1 custom-scrollbar overflow-y-scroll p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
