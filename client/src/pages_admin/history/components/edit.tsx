import React from 'react';
import { Button } from '@/components/custom/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormSettings } from './form-settings';
import { dataFormSettingsSelectLeft, dataFormSettingsSelectRight } from '@/utils/constant';

interface EditProps {
    onClose: () => void;
}

export function Edit({ onClose }: EditProps) {
    const form = useForm();

    const handleSaveChanges = (data: any) => {
        console.log("Form data submitted:", data);
        // Handle the form submission here
    };

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-85 flex items-center justify-center z-50'>
            <div className='bg-black rounded-lg p-8 max-w-md mx-auto shadow-lg relative w-full md:max-w-lg'>
                <button 
                    onClick={onClose}
                    className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
                >
                    ✕
                </button>
                <h2 className='text-lg text-white font-bold mb-4'>Edit User Settings</h2>
                
                {/* Form Section */}
                <Form {...form}>
                    <div className='space-y-4'>
                        <FormSettings
                            data={dataFormSettingsSelectLeft}
                            name='fullname'
                            label='Fullname'
                            placeholder='Your Fullname'
                        />
                        <FormSettings
                            data={dataFormSettingsSelectRight}
                            name='nickname'
                            label='Nickname'
                            placeholder='Your Nickname'
                        />
                    </div>
                    <div className='flex justify-end mt-6'>
                        <Button type='submit' className='w-28 bg-colorPrimary text-primary hover:text-textPrimary'>
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
