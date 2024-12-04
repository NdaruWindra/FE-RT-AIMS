import React, { useEffect } from 'react';
import { Button } from '@/components/custom/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormSettings } from './form-settings';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { updateUser } from '@/features/user/userSlice';
import { useNavigate } from 'react-router-dom';

interface EditProps {
  onClose: () => void;
  initialData: { username: string; email: string };
}

export function Edit({ onClose, initialData }: EditProps) {
  const token = useAppSelector((state) => state.user.refreshToken) || '';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      username: initialData.username, 
      newEmail: '',                  
    },
  });

  const handleSaveChanges = (data: any) => {
    dispatch(
      updateUser({
        accessToken: token,
        data: {
          username: data.username,       
          newEmail: data.newEmail,       
          targetEmail: initialData.email, 
        },
      })
    );
    

    console.log('Form data submitted:', data);
    onClose();
    return navigate('/dashboard-admin')
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
          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              onClick={form.handleSubmit(handleSaveChanges)}
              className="w-28 bg-colorPrimary text-primary hover:text-textPrimary"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
