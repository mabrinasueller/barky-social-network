import BioEditor from "../Bio";
import { render, waitFor, fireEvent } from "@testing-library/react";
import axios from "../axios";

jest.mock("../axios");

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
test("clicking on add button triggers textarea and save button to be rendered", () => {
    const mockOnClick = jest.fn();
    const { container } = render(<BioEditor onClick={mockOnClick} />);

    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toBe("Save");
});

test("clicking edit button triggers textarea and save button to be rendered", () => {
    const mockOnClick = jest.fn();
    const { container } = render(
        <BioEditor onClick={mockOnClick} bio="test" />
    );

    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toBe("Save");
});

// 4. Clicking the "Save" button causes an ajax request.
// 5. When the mock request is successful, the function that was passed as a prop to the component gets called.
test("clicking 'save' causes ajax request if bio has changed", async () => {
    axios.post.mockResolvedValue({
        data: {
            bio: "test",
        },
    });
    const mockSetBio = jest.fn();
    const { container } = render(<BioEditor setBio={mockSetBio} />);
    fireEvent.click(container.querySelector("button"));
    fireEvent.change(container.querySelector("textarea"), {
        target: { value: "test" },
    });
    fireEvent.click(container.querySelector("button"));
    await waitFor(() => expect(mockSetBio.mock.calls.length).toBe(1));
});
