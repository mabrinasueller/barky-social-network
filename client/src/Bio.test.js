import BioEditor from "./Bio";
import { render, waitFor, fireEvent } from "@testing-library/react";

// 1. When no bio is passed to it, an "Add" button is rendered.
test("Renders correctly when no bio is passed to it", () => {
    const { container } = render(<BioEditor />);
    expect(container.querySelector("button").innerHTML).toBe("Add Bio");
});

//2. When a bio is passed to it, an "Edit" button is rendered.
test("Renders correctly when bio is present", () => {
    const { container } = render(<BioEditor bio="test" />);
    expect(container.querySelector("button").innerHTML).toBe("Edit Bio");
});

//3. Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.
test("clicking on add or edit button triggers textarea and save button to be rendered", () => {
    const mockOnClick = jest.fn();
    const { container } = render(<BioEditor onClick={mockOnClick} />);

    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toBe("Save");
    // expect(mockOnClick.mock.results.value).toBe("textarea");
});

// 4. Clicking the "Save" button causes an ajax request. The request should not actually happen during your test. To prevent it from actually happening, you should mock axios.
test("clicking 'save' causes ajax request", () => {
    const mockOnClick = jest.fn();
    const { container } = render(<BioEditor onClick={mockOnClick} />);
    expect(container.querySelector("button").innerHTML).toBe("Edit Bio");
});
// 5. When the mock request is successful, the function that was passed as a prop to the component gets called.
