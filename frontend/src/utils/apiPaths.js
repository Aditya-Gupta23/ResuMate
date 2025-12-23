export const BASE_URL = 'http://localhost:5050';

// ROUTES Used for Frontend
export const API_PATHS = {
    AUTH: {
        REGISTER: '/api/v1/auth/signup',
        LOGIN: '/api/v1/auth/login',
        LOGOUT: '/api/v1/auth/logout',
        REFRESH: '/api/v1/auth/refresh',
        GOOGLE_LOGIN: '/api/v1/auth/google',
        VERIFY_OTP: '/api/v1/auth/verify-otp',
        RESEND_OTP: '/api/v1/auth/resend-otp',
        GET_PROFILE: '/api/v1/auth/me'
    }, 
    RESUME: {
        CREATE: '/api/resume',
        GET_ALL: '/api/resume',
        GET_BY_ID: (id) => `/api/resume/${id}`,

        UPDATE: (id) => `/api/resume/${id}`,
        DELETE: (id) => `/api/resume/${id}`,
        UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`
    },
    image: {
        UPLOAD_IMAGE: '/api/auth/upload-image'
    },
    analyzer: {
        ANALYZE_RESUME: '/api/ats/analyze'
    },
    interview: {
        GENERATE: '/api/interview/generate',
        EVALUATE: '/api/interview/evaluate'
    },
    jobs: {
        GET_ALL: '/api/jobs'
    }
}