'use client';
import { useState } from 'react';
const AdminProfileCard = ({ userData, save }) => {
  const [user, setUser] = useState(userData?.data || null);

  function handleChange(attr, val) {
    const copy = {
      ...user,
    };
    copy[attr] = val;
    setUser(copy);
  }
  function handleSave() {
    save(user);
  }
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  {user.email}
                </h3>
                <div className="mb-8 flex items-center justify-center"></div>
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    disabled
                    placeholder="Enter your Email"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Change your Password"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="firstName"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="firstName"
                    name="firstName"
                    value={user.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="Enter your First Name"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="lastName"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="lastName"
                    name="lastName"
                    value={user.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Enter your Last Name"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="role"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    name="role"
                    value={user.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="isVerified"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    isVerified
                  </label>
                  <input
                    type="checkbox"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    name="isVerified"
                    checked={user.isVerified}
                    onChange={() =>
                      handleChange('isVerified', !user.isVerified)
                    }
                  />
                </div>
                <div className="mb-6">
                  <button
                    onClick={handleSave}
                    className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProfileCard;
