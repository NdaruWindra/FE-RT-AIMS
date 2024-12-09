import React, { useEffect, useState } from 'react';
import { Button } from '@/components/custom/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormSettings } from './form-settings';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchUpdateUserMutation } from '@/features/user/userThunk'; // Import the mutation hook

interface EditProps {
  onClose: () => void;
  initialData: { username: string; email: string };
}

export function Edit({ onClose, initialData }: EditProps) {
  const token = useAppSelector((state) => state.user.accessToken) || ''; // Ensure it's accessToken, not refreshToken
  const navigate = useNavigate();
  
  // State for managing loading, error, and success messages
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Destructure the mutation hook for updating user
  const [fetchUpdateUser] = useFetchUpdateUserMutation();

  const form = useForm({
    defaultValues: {
      username: initialData.username, 
      newEmail: '',                  
    },
  });

  const handleSaveChanges = async (data: any) => {
    setIsLoading(true); // Set loading state to true when the request starts
    setErrorMessage(null); // Clear previous error message
    setSuccessMessage(null); // Clear previous success message

    try {
      // Call the fetchUpdateUser mutation with the updated data
      const response = await fetchUpdateUser({
        accessToken: token,
        username: data.username,
        email: data.newEmail,
        targetEmail: initialData.email,
      }).unwrap(); // unwrap to access the actual response

      // Set success message if the update was successful
      setSuccessMessage(response.message);
      onClose();  // Close the modal
      navigate('/dashboard-admin');  // Navigate to the desired page after successful update
    } catch (error: any) {
      // Set error message if the update fails
      setErrorMessage(error.message || 'Failed to update user data');
    } finally {
      setIsLoading(false); // Set loading state to false when the request finishes
    }
  };

  useEffect(() => {
    form.reset({
      username: initialData.username,
      newEmail: initialData.email, 
    });
  }, [initialData, form]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-85 flex items-center justify-center z-50">
      <div className="bg-black rounded-lg p-8 max-w-md mx-auto shadow-lg relative w-full md:max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-lg text-white font-bold mb-4">Edit User Settings</h2>

        <Form {...form}>
          <div className="space-y-4">
            <FormSettings
              control={form.control}
              name="username"
              label="Username"
              placeholder="Your Username"
            />
            <FormSettings
              control={form.control}
              name="newEmail"
              label="New Email"
              placeholder="Enter New Email"
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mt-2">{successMessage}</div>
          )}
          <div className="flex justify-end mt-6">
            <Button
              type="button"  // Change from 'submit' to 'button' to handle form manually
              onClick={form.handleSubmit(handleSaveChanges)}
              className="w-28 bg-colorPrimary text-primary hover:text-textPrimary"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
