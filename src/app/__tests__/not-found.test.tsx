import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from "@/app/not-found";


jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            back: jest.fn(),
        };
    },
}));

// Мок для next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLImageElement> & React.ImgHTMLAttributes<HTMLImageElement>) => {
        return <img {...props} />;
    },
}));


describe('NotFoundPage', () => {
    it('renders 404 text', () => {
        render(<NotFoundPage />);
        expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
        expect(screen.getByText('Кажется, мы не можем найти страницу, которую вы ищете. Возможно, адрес был введен неправильно или страница была перемещена.')).toBeInTheDocument();
    });

    it('has navigation buttons', () => {
        render(<NotFoundPage />);
        expect(screen.getByText('Вернуться назад')).toBeInTheDocument();
        expect(screen.getByText('На главную')).toBeInTheDocument();
    });

    it('displays the not-found image', () => {
        render(<NotFoundPage />);
        expect(screen.getByAltText('Страница не найдена')).toBeInTheDocument();
    });
});
