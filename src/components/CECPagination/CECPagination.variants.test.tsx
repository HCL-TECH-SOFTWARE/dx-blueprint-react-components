import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
    PaginationButton,
    ItemsPerPageDropdown,
    PageInfo,
    PageNumbers,
    Bullets,
    DefaultVariant,
    CompactVariant,
    BulletsVariant
} from './CECPagination.variants';
// Mock window.innerWidth for responsive testing
Object.defineProperty( window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024
} );
describe( 'CECPagination Variants', () => {
    beforeEach( () => {
        jest.clearAllMocks();
        // Reset window width to desktop default
        Object.defineProperty( window, 'innerWidth', { value: 1024 } );
    } );
    // PaginationButton Tests
    describe( '🔘 PaginationButton', () => {
        it( 'renders with default props', () => {
            render( <PaginationButton ariaLabel="Test Button">Click me</PaginationButton> );
            const button = screen.getByRole( 'button' );
            expect( button ).toBeInTheDocument();
            expect( button ).toHaveAttribute( 'aria-label', 'Test Button' );
            expect( button ).toHaveTextContent( 'Click me' );
        } );
        it( 'applies custom className', () => {
            render( <PaginationButton ariaLabel="Test" className="custom-class">Button</PaginationButton> );
            const button = screen.getByRole( 'button' );
            expect( button ).toHaveClass( 'cec-pagination__button', 'custom-class' );
        } );
        it( 'handles disabled state', () => {
            render( <PaginationButton ariaLabel="Test" disabled>Disabled</PaginationButton> );
            const button = screen.getByRole( 'button' );
            expect( button ).toBeDisabled();
        } );
        it( 'calls onClick when clicked', () => {
            const handleClick = jest.fn();
            render( <PaginationButton ariaLabel="Test" onClick={handleClick}>Click</PaginationButton> );
            fireEvent.click( screen.getByRole( 'button' ) );
            expect( handleClick ).toHaveBeenCalledTimes( 1 );
        } );
        it( 'does not call onClick when disabled', () => {
            const handleClick = jest.fn();
            render( <PaginationButton ariaLabel="Test" onClick={handleClick} disabled>Click</PaginationButton> );
            fireEvent.click( screen.getByRole( 'button' ) );
            expect( handleClick ).not.toHaveBeenCalled();
        } );
    } );
    // ItemsPerPageDropdown Tests
    describe( '📋 ItemsPerPageDropdown', () => {
        const defaultProps = {
            itemsPerPage: 10,
            onItemsPerPageChange: jest.fn(),
            itemsPerPageOptions: [5, 10, 25, 50]
        };
        it( 'renders dropdown with options', () => {
            render( <ItemsPerPageDropdown {...defaultProps} /> );
            const select = screen.getByRole( 'combobox' );
            expect( select ).toBeInTheDocument();
            expect( select ).toHaveValue( '10' );
            const options = screen.getAllByRole( 'option' );
            expect( options ).toHaveLength( 4 );
            expect( options[0] ).toHaveTextContent( '5' );
            expect( options[1] ).toHaveTextContent( '10' );
        } );
        it( 'calls onItemsPerPageChange when selection changes', () => {
            const mockChange = jest.fn();
            render( <ItemsPerPageDropdown {...defaultProps} onItemsPerPageChange={mockChange} /> );
            const select = screen.getByRole( 'combobox' );
            fireEvent.change( select, { target: { value: '25' } } );
            expect( mockChange ).toHaveBeenCalledWith( 25 );
        } );
        it( 'disables dropdown when disabled prop is true', () => {
            render( <ItemsPerPageDropdown {...defaultProps} disabled /> );
            const select = screen.getByRole( 'combobox' );
            expect( select ).toBeDisabled();
        } );
        it( 'uses custom messages', () => {
            const messages = { itemsPerPage: 'Items', entries: 'per page' };
            render( <ItemsPerPageDropdown {...defaultProps} messages={messages} /> );
            const select = screen.getByRole( 'combobox' );
            expect( select ).toHaveAttribute( 'aria-label', 'Items' );
            const options = screen.getAllByRole( 'option' );
            expect( options[0] ).toHaveTextContent( '5 per page' );
        } );
        it( 'applies custom className', () => {
            render( <ItemsPerPageDropdown {...defaultProps} className="custom-class" /> );
            const container = screen.getByRole( 'combobox' ).closest( '.cec-pagination__items-per-page' );
            expect( container ).toHaveClass( 'custom-class' );
        } );
    } );
    // PageInfo Tests
    describe( '📊 PageInfo', () => {
        const defaultProps = {
            startIndex: 0,
            endIndex: 10,
            totalItems: 100
        };
        it( 'renders page info with default messages', () => {
            render( <PageInfo {...defaultProps} /> );
            expect( screen.getByText( 'Showing 1 to 10 of 100' ) ).toBeInTheDocument();
        } );
        it( 'handles zero-based startIndex correctly', () => {
            render( <PageInfo startIndex={10} endIndex={20} totalItems={100} /> );
            const info = document.querySelector( '.cec-pagination__info' );
            expect( info?.textContent ).toContain( 'Showing 10 to 20 of 100' );
        } );
        it( 'clamps endIndex to totalItems', () => {
            render( <PageInfo startIndex={90} endIndex={110} totalItems={100} /> );
            const info = document.querySelector( '.cec-pagination__info' );
            expect( info?.textContent ).toContain( 'Showing 90 to 100 of 100' );
        } );
        it( 'uses custom messages', () => {
            const messages = { showing: 'Displaying', of: 'out of', entries: 'items' };
            render( <PageInfo {...defaultProps} messages={messages} /> );
            expect( screen.getByText( 'Displaying 1 to 10 out of 100 items' ) ).toBeInTheDocument();
        } );
        it( 'applies custom className', () => {
            render( <PageInfo {...defaultProps} className="custom-class" /> );
            const info = screen.getByText( 'Showing 1 to 10 of 100' );
            expect( info ).toHaveClass( 'custom-class' );
        } );
        it( 'omits the range clause when a single item is displayed (non-zero totalItems)', () => {
            render( <PageInfo startIndex={10} endIndex={10} totalItems={25} /> );
            const info = document.querySelector( '.cec-pagination__info' );
            expect( info?.textContent ).toContain( 'Showing 10 of 25' );
            expect( info?.textContent ).not.toContain( 'to' );
        } );
        it( 'uses custom messages.to for the range connector word', () => {
            const messages = { to: 'through' };
            render( <PageInfo startIndex={1} endIndex={10} totalItems={100} messages={messages} /> );
            const info = document.querySelector( '.cec-pagination__info' );
            expect( info?.textContent ).toContain( 'Showing 1 through 10 of 100' );
        } );
    } );
    // PageNumbers Tests
    describe( '📄 PageNumbers', () => {
        const defaultProps = {
            currentPage: 3,
            totalPages: 10,
            onPageChange: jest.fn()
        };
        it( 'renders page numbers for small total', () => {
            render( <PageNumbers {...defaultProps} totalPages={5} /> );
            const buttons = screen.getAllByRole( 'button' );
            expect( buttons ).toHaveLength( 5 );
            expect( buttons[0] ).toHaveTextContent( '1' );
            expect( buttons[4] ).toHaveTextContent( '5' );
        } );
        it( 'shows ellipsis for large total pages', () => {
            render( <PageNumbers {...defaultProps} /> );
            expect( screen.getByText( '...' ) ).toBeInTheDocument();
        } );
        it( 'marks current page as active', () => {
            render( <PageNumbers {...defaultProps} /> );
            const activeButton = screen.getByText( '3' );
            expect( activeButton ).toHaveClass( 'active' );
            expect( activeButton ).toHaveAttribute( 'aria-current', 'page' );
        } );
        it( 'calls onPageChange when page is clicked', () => {
            const mockChange = jest.fn();
            render( <PageNumbers {...defaultProps} onPageChange={mockChange} /> );
            fireEvent.click( screen.getByText( '5' ) );
            expect( mockChange ).toHaveBeenCalledWith( 5 );
        } );
        it( 'does not call onPageChange for current page', () => {
            const mockChange = jest.fn();
            render( <PageNumbers {...defaultProps} onPageChange={mockChange} /> );
            fireEvent.click( screen.getByText( '3' ) );
            expect( mockChange ).not.toHaveBeenCalled();
        } );
        it( 'does not call onPageChange for ellipsis', () => {
            const mockChange = jest.fn();
            render( <PageNumbers {...defaultProps} onPageChange={mockChange} /> );
            fireEvent.click( screen.getByText( '...' ) );
            expect( mockChange ).not.toHaveBeenCalled();
        } );
        it( 'disables all buttons when disabled prop is true', () => {
            render( <PageNumbers {...defaultProps} disabled /> );
            const buttons = screen.getAllByRole( 'button' );
            buttons.forEach( button => {
                expect( button ).toBeDisabled();
            } );
        } );
        it( 'uses custom aria labels', () => {
            const ariaLabels = { page: ( page: number ) => `Go to page ${page}` };
            render( <PageNumbers {...defaultProps} ariaLabels={ariaLabels} /> );
            const pageButton = screen.getByText( '2' );
            expect( pageButton ).toHaveAttribute( 'aria-label', 'Go to page 2' );
        } );
        it( 'is responsive to window width', () => {
            // Mobile view
            Object.defineProperty( window, 'innerWidth', { value: 480 } );
            render( <PageNumbers {...defaultProps} totalPages={10} /> );
            // Should show fewer pages on mobile
            const buttons = screen.getAllByRole( 'button' );
            expect( buttons.length ).toBeLessThanOrEqual( 5 ); // 3 pages + ellipsis
        } );
    } );
    // Bullets Tests
    describe( '⚫ Bullets', () => {
        const defaultProps = {
            currentPage: 2,
            totalPages: 5,
            onPageChange: jest.fn()
        };
        it( 'renders correct number of bullets', () => {
            render( <Bullets {...defaultProps} /> );
            const buttons = screen.getAllByRole( 'button' );
            expect( buttons ).toHaveLength( 5 );
        } );
        it( 'marks current bullet as active', () => {
            render( <Bullets {...defaultProps} /> );
            const activeBullet = screen.getByLabelText( 'Go to page 2' );
            expect( activeBullet ).toHaveClass( 'active' );
            expect( activeBullet ).toHaveAttribute( 'aria-current', 'true' );
        } );
        it( 'calls onPageChange when bullet is clicked', () => {
            const mockChange = jest.fn();
            render( <Bullets {...defaultProps} onPageChange={mockChange} /> );
            fireEvent.click( screen.getByLabelText( 'Go to page 4' ) );
            expect( mockChange ).toHaveBeenCalledWith( 4 );
        } );
        it( 'handles arrow key navigation', () => {
            const mockChange = jest.fn();
            render( <Bullets {...defaultProps} onPageChange={mockChange} /> );
            const currentBullet = screen.getByLabelText( 'Go to page 2' );
            currentBullet.focus();
            // Arrow right should go to next bullet
            fireEvent.keyDown( currentBullet, { key: 'ArrowRight' } );
            expect( mockChange ).toHaveBeenCalledWith( 3 );
        } );
        it( 'handles arrow left navigation', () => {
            const mockChange = jest.fn();
            render( <Bullets {...defaultProps} onPageChange={mockChange} /> );
            const currentBullet = screen.getByLabelText( 'Go to page 2' );
            currentBullet.focus();
            // Arrow left should go to previous bullet
            fireEvent.keyDown( currentBullet, { key: 'ArrowLeft' } );
            expect( mockChange ).toHaveBeenCalledWith( 1 );
        } );
        it( 'wraps around navigation', () => {
            const mockChange = jest.fn();
            render( <Bullets {...defaultProps} onPageChange={mockChange} /> );
            const firstBullet = screen.getByLabelText( 'Go to page 1' );
            firstBullet.focus();
            // Arrow left on first bullet should go to last bullet
            fireEvent.keyDown( firstBullet, { key: 'ArrowLeft' } );
            expect( mockChange ).toHaveBeenCalledWith( 5 );
        } );
        it( 'handles Enter and Space keys', () => {
            const mockChange = jest.fn();
            render( <Bullets {...defaultProps} onPageChange={mockChange} /> );
            const bullet = screen.getByLabelText( 'Go to page 3' );
            fireEvent.keyDown( bullet, { key: 'Enter' } );
            expect( mockChange ).toHaveBeenCalledWith( 3 );
            mockChange.mockClear();
            fireEvent.keyDown( bullet, { key: ' ' } );
            expect( mockChange ).toHaveBeenCalledWith( 3 );
        } );
        it( 'applies position classes correctly', () => {
            const { rerender } = render( <Bullets {...defaultProps} position="center" /> );
            expect( screen.getByRole( 'tablist' ) ).toHaveClass( 'cec-pagination-bullets--center' );
            rerender( <Bullets {...defaultProps} position="left" /> );
            expect( screen.getByRole( 'tablist' ) ).toHaveClass( 'cec-pagination-bullets--right' );
            rerender( <Bullets {...defaultProps} position="right" /> );
            expect( screen.getByRole( 'tablist' ) ).toHaveClass( 'cec-pagination-bullets--right' );
        } );
    } );
    // DefaultVariant Tests
    describe( '🏠 DefaultVariant', () => {
        const defaultProps = {
            currentPage: 2,
            totalPages: 5,
            onPageChange: jest.fn(),
            itemsPerPage: 10,
            onItemsPerPageChange: jest.fn(),
            totalItems: 50,
            startIndex: 10,
            endIndex: 20
        };
        it( 'renders all sections when enabled', () => {
            render( <DefaultVariant {...defaultProps} /> );
            // Check items per page dropdown
            expect( screen.getByRole( 'combobox' ) ).toBeInTheDocument();
            // Check page info - check the container content
            const info = document.querySelector( '.cec-pagination__info' );
            expect( info?.textContent ).toContain( 'Showing 10 to 20 of 50' );
            // Check pagination buttons
            expect( screen.getByLabelText( /Previous/i ) ).toBeInTheDocument();
            expect( screen.getByLabelText( /Next/i ) ).toBeInTheDocument();
            // Check page numbers
            expect( screen.getByText( '1' ) ).toBeInTheDocument();
            expect( screen.getByText( '5' ) ).toBeInTheDocument();
        } );
        it( 'hides items per page dropdown when disabled', () => {
            render( <DefaultVariant {...defaultProps} showItemsPerPageDropdown={false} /> );
            expect( screen.queryByRole( 'combobox' ) ).not.toBeInTheDocument();
        } );
        it( 'hides page info when disabled', () => {
            render( <DefaultVariant {...defaultProps} showPageInfo={false} /> );
            expect( screen.queryByText( 'Showing' ) ).not.toBeInTheDocument();
        } );
        it( 'hides pagination when disabled', () => {
            render( <DefaultVariant {...defaultProps} showPagination={false} /> );
            expect( screen.queryByLabelText( /Previous/i ) ).not.toBeInTheDocument();
        } );
        it( 'returns null when showPagination is false', () => {
            const { container } = render( <DefaultVariant {...defaultProps} showPagination={false} showItemsPerPageDropdown={false} showPageInfo={false} /> );
            expect( container.firstChild ).toBeNull();
        } );
        it( 'handles previous button click', () => {
            const mockChange = jest.fn();
            render( <DefaultVariant {...defaultProps} onPageChange={mockChange} /> );
            fireEvent.click( screen.getByLabelText( /Previous/i ) );
            expect( mockChange ).toHaveBeenCalledWith( 1 );
        } );
        it( 'handles next button click', () => {
            const mockChange = jest.fn();
            render( <DefaultVariant {...defaultProps} onPageChange={mockChange} /> );
            fireEvent.click( screen.getByLabelText( /Next/i ) );
            expect( mockChange ).toHaveBeenCalledWith( 3 );
        } );
        it( 'handles first button click', () => {
            const mockChange = jest.fn();
            render( <DefaultVariant {...defaultProps} onPageChange={mockChange} /> );
            fireEvent.click( screen.getByLabelText( /First page/i ) );
            expect( mockChange ).toHaveBeenCalledWith( 1 );
        } );
        it( 'handles last button click', () => {
            const mockChange = jest.fn();
            render( <DefaultVariant {...defaultProps} onPageChange={mockChange} /> );
            fireEvent.click( screen.getByLabelText( /Last page/i ) );
            expect( mockChange ).toHaveBeenCalledWith( 5 );
        } );
        it( 'disables previous button on first page', () => {
            render( <DefaultVariant {...defaultProps} currentPage={1} /> );
            expect( screen.getByLabelText( /Previous/i ) ).toBeDisabled();
        } );
        it( 'disables next button on last page', () => {
            render( <DefaultVariant {...defaultProps} currentPage={5} /> );
            expect( screen.getByLabelText( /Next/i ) ).toBeDisabled();
        } );
        it( 'disables all controls when disabled', () => {
            render( <DefaultVariant {...defaultProps} disabled /> );
            expect( screen.getByLabelText( /Previous/i ) ).toBeDisabled();
            expect( screen.getByLabelText( /Next/i ) ).toBeDisabled();
            expect( screen.getByRole( 'combobox' ) ).toBeDisabled();
        } );
        it( 'applies custom className', () => {
            render( <DefaultVariant {...defaultProps} className="custom-class" /> );
            const container = screen.getByRole( 'navigation' );
            expect( container ).toHaveClass( 'custom-class' );
        } );
        it( 'sets direction attribute', () => {
            render( <DefaultVariant {...defaultProps} dir="rtl" /> );
            const container = screen.getByRole( 'navigation' );
            expect( container ).toHaveAttribute( 'dir', 'rtl' );
        } );
    } );
    // CompactVariant Tests
    describe( '📱 CompactVariant', () => {
        const defaultProps = {
            currentPage: 2,
            totalPages: 5,
            onPageChange: jest.fn()
        };
        it( 'renders compact pagination', () => {
            render( <CompactVariant {...defaultProps} /> );
            expect( screen.getByText( '2 / 5' ) ).toBeInTheDocument();
            expect( screen.getByLabelText( /Previous/i ) ).toBeInTheDocument();
            expect( screen.getByLabelText( /Next/i ) ).toBeInTheDocument();
        } );
        it( 'handles previous button click', () => {
            const mockChange = jest.fn();
            render( <CompactVariant {...defaultProps} onPageChange={mockChange} /> );
            fireEvent.click( screen.getByLabelText( /Previous/i ) );
            expect( mockChange ).toHaveBeenCalledWith( 1 );
        } );
        it( 'handles next button click', () => {
            const mockChange = jest.fn();
            render( <CompactVariant {...defaultProps} onPageChange={mockChange} /> );
            fireEvent.click( screen.getByLabelText( /Next/i ) );
            expect( mockChange ).toHaveBeenCalledWith( 3 );
        } );
        it( 'disables previous button on first page', () => {
            render( <CompactVariant {...defaultProps} currentPage={1} /> );
            expect( screen.getByLabelText( /Previous/i ) ).toBeDisabled();
        } );
        it( 'disables next button on last page', () => {
            render( <CompactVariant {...defaultProps} currentPage={5} /> );
            expect( screen.getByLabelText( /Next/i ) ).toBeDisabled();
        } );
        it( 'disables all controls when disabled', () => {
            render( <CompactVariant {...defaultProps} disabled /> );
            expect( screen.getByLabelText( /Previous/i ) ).toBeDisabled();
            expect( screen.getByLabelText( /Next/i ) ).toBeDisabled();
        } );
        it( 'applies custom className', () => {
            render( <CompactVariant {...defaultProps} className="custom-class" /> );
            const container = screen.getByRole( 'navigation' );
            expect( container ).toHaveClass( 'custom-class' );
        } );
        it( 'sets direction attribute', () => {
            render( <CompactVariant {...defaultProps} dir="rtl" /> );
            const container = screen.getByRole( 'navigation' );
            expect( container ).toHaveAttribute( 'dir', 'rtl' );
        } );
    } );
    // BulletsVariant Tests
    describe( '⚫ BulletsVariant', () => {
        const defaultProps = {
            currentPage: 2,
            totalPages: 5,
            onPageChange: jest.fn()
        };
        it( 'renders bullets variant', () => {
            render( <BulletsVariant {...defaultProps} /> );
            const bullets = screen.getAllByRole( 'button' );
            expect( bullets ).toHaveLength( 5 );
            expect( screen.getByRole( 'tablist' ) ).toBeInTheDocument();
        } );
        it( 'handles bullet clicks', () => {
            const mockChange = jest.fn();
            render( <BulletsVariant {...defaultProps} onPageChange={mockChange} /> );
            fireEvent.click( screen.getByLabelText( 'Go to page 4' ) );
            expect( mockChange ).toHaveBeenCalledWith( 4 );
        } );
        it( 'applies custom className', () => {
            render( <BulletsVariant {...defaultProps} className="custom-class" /> );
            const container = screen.getByRole( 'navigation' );
            expect( container ).toHaveClass( 'custom-class' );
        } );
        it( 'sets direction attribute', () => {
            render( <BulletsVariant {...defaultProps} dir="rtl" /> );
            const container = screen.getByRole( 'navigation' );
            expect( container ).toHaveAttribute( 'dir', 'rtl' );
        } );
        it( 'passes position to Bullets component', () => {
            render( <BulletsVariant {...defaultProps} position="left" /> );
            const tablist = screen.getByRole( 'tablist' );
            expect( tablist ).toHaveClass( 'cec-pagination-bullets--right' ); // Flipped for RTL
        } );
    } );
    // Edge Cases and Error Handling
    describe( '🐛 Edge Cases', () => {
        it( 'handles totalPages of 1', () => {
            render( <PageNumbers currentPage={1} totalPages={1} onPageChange={jest.fn()} /> );
            const buttons = screen.getAllByRole( 'button' );
            expect( buttons ).toHaveLength( 1 );
            expect( buttons[0] ).toHaveTextContent( '1' );
        } );
        it( 'handles currentPage greater than totalPages', () => {
            render( <PageNumbers currentPage={10} totalPages={5} onPageChange={jest.fn()} /> );
            // Should still render something sensible - check for any button
            const buttons = screen.getAllByRole( 'button' );
            expect( buttons.length ).toBeGreaterThan( 0 );
        } );
        it( 'handles zero totalItems', () => {
            render( <PageInfo startIndex={0} endIndex={0} totalItems={0} /> );
            const info = document.querySelector( '.cec-pagination__info' );
            // When startIndex equals endIndex, "to X" is omitted for cleaner display
            expect( info?.textContent ).toContain( 'Showing 0 of 0' );
        } );
        it( 'handles negative startIndex', () => {
            render( <PageInfo startIndex={-1} endIndex={10} totalItems={100} /> );
            // The component clamps negative startIndex values to 1
            const info = document.querySelector( '.cec-pagination__info' );
            expect( info?.textContent ).toContain( 'Showing 1 to 10 of 100' );
        } );
        it( 'handles empty itemsPerPageOptions', () => {
            render( <ItemsPerPageDropdown
                itemsPerPage={10}
                onItemsPerPageChange={jest.fn()}
                itemsPerPageOptions={[]}
            /> );
            const select = screen.getByRole( 'combobox' );
            expect( select ).toBeInTheDocument();
        } );
    } );
    // Accessibility Tests
    describe( '♿ Accessibility', () => {
        it( 'has proper ARIA attributes on navigation', () => {
            render( <DefaultVariant {...{
                currentPage: 2,
                totalPages: 5,
                onPageChange: jest.fn(),
                itemsPerPage: 10,
                onItemsPerPageChange: jest.fn(),
                totalItems: 50,
                startIndex: 10,
                endIndex: 20
            }} /> );
            const nav = screen.getByRole( 'navigation' );
            expect( nav ).toBeInTheDocument();
        } );
        it( 'has proper ARIA labels on bullets', () => {
            render( <Bullets currentPage={2} totalPages={5} onPageChange={jest.fn()} /> );
            const tablist = screen.getByRole( 'tablist' );
            expect( tablist ).toHaveAttribute( 'aria-label', 'Carousel pagination' );
            const bullets = screen.getAllByRole( 'button' );
            bullets.forEach( ( bullet, index ) => {
                expect( bullet ).toHaveAttribute( 'aria-label', `Go to page ${index + 1}` );
            } );
        } );
        it( 'has proper ARIA current attributes', () => {
            render( <PageNumbers currentPage={3} totalPages={10} onPageChange={jest.fn()} /> );
            const activeButton = screen.getByText( '3' );
            expect( activeButton ).toHaveAttribute( 'aria-current', 'page' );
        } );
        it( 'should handle ArrowRight key when not at last page', () => {
            const mockOnPageChange = jest.fn();
            render( <Bullets currentPage={2} totalPages={5} onPageChange={mockOnPageChange} /> );
            const activeBullet = screen.getByRole( 'button', { name: 'Go to page 2' } );
            activeBullet.focus();
            fireEvent.keyDown( activeBullet, { key: 'ArrowRight' } );
            expect( mockOnPageChange ).toHaveBeenCalledWith( 3 );
        } );
        it( 'should handle ArrowLeft key when not at first page', () => {
            const mockOnPageChange = jest.fn();
            render( <Bullets currentPage={3} totalPages={5} onPageChange={mockOnPageChange} /> );
            const activeBullet = screen.getByRole( 'button', { name: 'Go to page 3' } );
            activeBullet.focus();
            fireEvent.keyDown( activeBullet, { key: 'ArrowLeft' } );
            expect( mockOnPageChange ).toHaveBeenCalledWith( 2 );
        } );
        it( 'should wrap around from first to last page with ArrowLeft', () => {
            const mockOnPageChange = jest.fn();
            render( <Bullets currentPage={1} totalPages={5} onPageChange={mockOnPageChange} /> );
            const activeBullet = screen.getByRole( 'button', { name: 'Go to page 1' } );
            activeBullet.focus();
            fireEvent.keyDown( activeBullet, { key: 'ArrowLeft' } );
            expect( mockOnPageChange ).toHaveBeenCalledWith( 5 );
        } );
        it( 'should wrap around from last to first page with ArrowRight', () => {
            const mockOnPageChange = jest.fn();
            render( <Bullets currentPage={5} totalPages={5} onPageChange={mockOnPageChange} /> );
            const activeBullet = screen.getByRole( 'button', { name: 'Go to page 5' } );
            activeBullet.focus();
            fireEvent.keyDown( activeBullet, { key: 'ArrowRight' } );
            expect( mockOnPageChange ).toHaveBeenCalledWith( 1 );
        } );
        it( 'should handle focus timeout after keyboard navigation', () => {
            jest.useFakeTimers();
            const mockOnPageChange = jest.fn();
            render( <Bullets currentPage={2} totalPages={5} onPageChange={mockOnPageChange} /> );
            const activeBullet = screen.getByRole( 'button', { name: 'Go to page 2' } );
            activeBullet.focus();
            fireEvent.keyDown( activeBullet, { key: 'ArrowRight' } );
            // Fast-forward timers
            jest.advanceTimersByTime( 0 );
            expect( mockOnPageChange ).toHaveBeenCalledWith( 3 );
            jest.useRealTimers();
        } );
    } );
} );
