import { Link, useNavigate } from 'react-router-dom';
import { LayoutTemplate, Menu, X, KeyRound } from 'lucide-react';
import { ProfileInfoCard } from './Cards'
import { landingPageStyles } from '../assets/dummystyle';
import { useState } from 'react';

const Navbar = ({user, setOpenAuthModal}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className={landingPageStyles.header}>
            <div className={landingPageStyles.headerContainer}>
                <div className={landingPageStyles.logoContainer} onClick={() => navigate('/')}>
                    <div className={landingPageStyles.logoIcon}>
                        <LayoutTemplate className={landingPageStyles.logoIconInner} />
                    </div>
                    <span className={landingPageStyles.logoText}>
                        ResuMate
                    </span>
                </div>

                {/* Menu Btn */}
                <button className={landingPageStyles.menuButton} onClick={() => {setMenuOpen(!menuOpen)}}>
                    {menuOpen
                        ? <X size={24} className={landingPageStyles.menuIcon} />
                        : <Menu size={24} className={landingPageStyles.menuIcon} />
                    }
                </button>
            </div>

            {menuOpen && (
                <div className={landingPageStyles.menu}>
                    <div className={landingPageStyles.menuContainer}>
                        {user ? (
                            <div className={landingPageStyles.menuUserInfo}>
                                <ProfileInfoCard />

                                <div className={landingPageStyles.menuUserWelcome}>
                                    Welcome back 👋
                                </div>

                                <button className={landingPageStyles.menuField}
                                    onClick={() => {
                                        navigate('/dashboard');
                                        setMenuOpen(false);
                                    }}>
                                    Go to Dashboard
                                </button>

                                <button
                                    onClick={() => navigate('/ats-checker')}
                                    className={landingPageStyles.menuField}
                                >
                                    ATS Score Checker
                                </button>

                                <button
                                    onClick={() => navigate('/mock-interview')}
                                    className={landingPageStyles.menuField}
                                >
                                    Mock Interview
                                </button>

                                <button
                                    onClick={() => navigate('/profile-page')}
                                    className={landingPageStyles.menuField}
                                >
                                    Account
                                </button>

                            </div>
                        ) : (
                            <button className={landingPageStyles.menuAuthButton}
                                onClick={() => {
                                    setOpenAuthModal(true);
                                    setMenuOpen(false);
                                }}
                            >
                                Get Started
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;