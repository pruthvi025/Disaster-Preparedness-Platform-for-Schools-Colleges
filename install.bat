@echo off
echo Installing dependencies for Disaster Preparedness Platform...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version

echo.
echo Installing npm packages (Next.js, TypeScript, Tailwind CSS, Framer Motion)...
npm install

if %errorlevel% equ 0 (
    echo.
    echo ✅ Installation completed successfully!
    echo.
    echo 🎨 Phase 1 UI/UX is ready!
    echo.
    echo Next steps:
    echo 1. Create a .env.local file with your Supabase credentials
    echo 2. Run: npm run dev
    echo 3. Visit: http://localhost:3000
    echo.
    echo 📱 Pages available:
    echo   - / (Landing page)
    echo   - /admin/register-school (School registration)
    echo   - /onboarding/profile-setup (Profile setup)
    echo.
) else (
    echo.
    echo ❌ Installation failed. Please check the error messages above.
)

pause
