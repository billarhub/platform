'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { createLoginFormSchema } from '@/lib/schemas/loginSchema';
import { IDecodedJwt, ILoginPayload, IUser } from '@/models';
import { Input } from '../common/Input';
import Card from '../common/Card';
import Button from '../common/Button';
import UserIcon from '../icon/UserIcon';
import PasswordIcon from '../icon/PasswordIcon';
import { jwtDecode } from 'jwt-decode';
import { createSession } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@/hooks/api/auth';
import SpinnerIcon from '../icon/SpinnerIcon';

interface ILoginFormProps {
  locale: string;
}

function LoginForm({ locale }: ILoginFormProps) {
  const router = useRouter();
  const loginTranslation = useTranslations('Login');
  const commonTranslations = useTranslations('Common');
  const loginFormSchema = createLoginFormSchema(commonTranslations);
  const { isLoading, isError, error, mutateAsync: signIn } = useSignIn();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginPayload>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin: SubmitHandler<ILoginPayload> = async (
    data,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    try {
      let authToken;
      let jwtDecoded;

      const response = await signIn({
        email: data.email.toLowerCase(),
        password: data.password,
      });

      authToken = response.data.token;

      jwtDecoded = jwtDecode(authToken) as IDecodedJwt;

      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/user/${jwtDecoded?.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const user = await userResponse.json();
      await createSession(authToken, user?.data?.data?.user);
      router.push(`/${locale}/dashboard`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGuestLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let authToken;
      let jwtDecoded;

      const response = await signIn({
        email: process.env.NEXT_PUBLIC_GUEST_EMAIL!.toLowerCase(),
        password: process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
      });

      authToken = response.data.token;

      jwtDecoded = jwtDecode(authToken) as IDecodedJwt;

      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/user/${jwtDecoded?.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const user = await userResponse.json();
      await createSession(authToken, user?.data?.data?.user);
      router.push(`/${locale}/dashboard`);
    } catch (err) {
      console.log(err);
    }
  };

  isError && <p>{JSON.stringify(error)}</p>;

  return (
    <div className="w-screen md:w-full h-full flex justify-center items-center p-4 md:p-0">
      <Card className="rounded-xl md:h-auto md:w-[687px]">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col justify-center items-center px-6 py-10 md:px-24 md:py-16 gap-5 text-black"
        >
          <h1 className="md:text-2xl text-md font-bold text-black uppercase mb-6">
            {loginTranslation('title')}
          </h1>
          <Input
            placeholder={loginTranslation('email')}
            {...register('email')}
            name="email"
            className="w-full"
            inputClassName="placeholder:font-base"
            leftIcon={<UserIcon className="w-8 h-8 rounded-md" />}
            error={errors?.email?.message}
          />
          <Input
            placeholder={loginTranslation('password')}
            {...register('password')}
            name="password"
            className="w-full"
            type="password"
            inputClassName="placeholder:font-base"
            leftIcon={<PasswordIcon className="w-8 h-8 rounded-md" />}
            error={errors?.password?.message}
          />
          <div className="flex justify-center md:justify-end items-center w-full">
            <button
              id="guest-button"
              className="text-primary-300 text-sm underline"
              onClick={handleGuestLogin}
            >
              {loginTranslation('guestLogin')}
            </button>
          </div>
          <Button
            type="submit"
            className="md:w-1/3 md:text-lg text-md rounded-3xl"
          >
            {isLoading ? (
              <SpinnerIcon className="m-auto w-10 h-10 text-gray-200 animate-spin fill-primary-300" />
            ) : (
              loginTranslation('submit')
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;
