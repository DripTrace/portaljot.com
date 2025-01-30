// import * as React from "react";

// interface ProfileImageProps {
//     src: string;
//     alt: string;
// }

// const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt }) => (
//     <img
//         loading="lazy"
//         src={src}
//         alt={alt}
//         className="shrink-0 aspect-square w-[60px]"
//     />
// );

// interface IconProps {
//     src: string;
//     alt: string;
//     className?: string;
// }

// const Icon: React.FC<IconProps> = ({ src, alt, className = "" }) => (
//     <img
//         loading="lazy"
//         src={src}
//         alt={alt}
//         className={`shrink-0 my-auto aspect-square w-[22px] ${className}`}
//     />
// );

// interface NavItemProps {
//     icon: string;
//     iconAlt: string;
//     label: string;
//     active?: boolean;
// }

// const NavItem: React.FC<NavItemProps> = ({
//     icon,
//     iconAlt,
//     label,
//     active = false,
// }) => (
//     <div
//         className={`flex gap-3.5 justify-center ${active ? "self-start mt-9 ml-8 max-md:ml-2.5" : "items-start px-8 py-5 mt-5 max-md:px-5"} text-lg tracking-normal leading-7 whitespace-nowrap ${active ? "text-white" : "text-zinc-400"}`}
//     >
//         <Icon src={icon} alt={iconAlt} />
//         <div>{label}</div>
//     </div>
// );

// interface UserInfoProps {
//     name: string;
//     balance: number;
// }

// const UserInfo: React.FC<UserInfoProps> = ({ name, balance }) => (
//     <div className="flex gap-2.5 justify-between mt-[962px] max-md:mt-10">
//         <ProfileImage
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecb59cf28b3b9f6f23ba29122f055f3c8b131b201ae06c7ff9af533d6e5d14c5?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//             alt="User profile"
//         />
//         <div className="flex flex-col justify-center my-auto">
//             <div className="text-lg font-semibold leading-5 text-white">
//                 {name}
//             </div>
//             <div className="flex gap-1 pr-3.5 mt-2.5 text-sm font-medium leading-5 text-stone-300">
//                 <div>{balance} &OVA</div>
//                 <Icon
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/2be0a6f2e573579c0884621717147081d555a677a895a7bbbae204660aaa6fa4?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                     alt="OVA icon"
//                     className="w-3.5"
//                 />
//             </div>
//         </div>
//     </div>
// );

// interface SettingsSectionProps {
//     title: string;
//     description: string;
// }

// const SettingsSection: React.FC<SettingsSectionProps> = ({
//     title,
//     description,
// }) => (
//     <>
//         <div className="self-start mt-14 capitalize max-md:mt-10">{title}</div>
//         <div className="self-start mt-2 text-sm leading-5 text-zinc-400">
//             {description}
//         </div>
//     </>
// );

// interface InputFieldProps {
//     label: string;
//     value: string;
//     placeholder?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({
//     label,
//     value,
//     placeholder = "",
// }) => (
//     <>
//         <div className="mt-7 text-base leading-7 text-zinc-400 max-md:max-w-full">
//             {label}
//         </div>
//         <div className="justify-center items-start px-5 py-5 mt-2 text-lg tracking-normal leading-7 rounded-md border border-solid border-neutral-600 max-md:px-5 max-md:max-w-full">
//             {value || placeholder}
//         </div>
//     </>
// );

// function Settings() {
//     const navItems: NavItemProps[] = [
//         {
//             icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e49a9062b3bee16fc88774992bebe676e485f224ae1930da37d9179e71aaa8a3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             iconAlt: "Home icon",
//             label: "Home",
//             active: true,
//         },
//         {
//             icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a2b02fce294025114fe374b7a472ea7b685e48dc1c55270f62a601adba401f3d?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             iconAlt: "Discover icon",
//             label: "Discover",
//         },
//         {
//             icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a09c7dff558b79603c47b4baa1cf71b8d93559c6123f19194233047d0ea38882?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             iconAlt: "Profile icon",
//             label: "Profile",
//         },
//     ];

//     return (
//         <div className="border-l border-solid bg-neutral-900 border-zinc-950 border-opacity-10">
//             <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                 <nav className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
//                     <div className="flex flex-col grow px-6 pt-8 pb-20 mx-auto w-full border-r border-solid bg-neutral-900 border-white border-opacity-10 max-md:px-5">
//                         <img
//                             loading="lazy"
//                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/1fe3b0f876d314223bdc5c7c8704e3868cb4d8282197a6c947c9bb8c3cedb330?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                             alt="Logo"
//                             className="self-center max-w-full aspect-[5.26] w-[214px]"
//                         />
//                         <div className="flex flex-col justify-center items-start px-8 py-4 mt-14 w-full text-lg font-medium capitalize whitespace-nowrap bg-white rounded-[50px] text-neutral-900 max-md:px-5 max-md:mt-10">
//                             <div className="flex gap-3.5 justify-center">
//                                 <Icon
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/e49a9062b3bee16fc88774992bebe676e485f224ae1930da37d9179e71aaa8a3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                     alt="Home icon"
//                                 />
//                                 <div>Home</div>
//                             </div>
//                         </div>
//                         {navItems.map((item) => (
//                             <NavItem key={item.label} {...item} />
//                         ))}
//                         <UserInfo name="0xru.....579" balance={2000} />
//                     </div>
//                 </nav>
//                 <main className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
//                     <div className="flex flex-col grow max-md:max-w-full">
//                         <header className="flex gap-5 justify-end items-start p-7 w-full border-b border-l border-solid bg-neutral-900 border-white border-opacity-10 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
//                             <div className="flex gap-2.5 text-2xl font-medium capitalize text-white text-opacity-80">
//                                 <Icon
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/a26f7e8d902236aaba2508dabb8e6ae017b0fef1f8ed8dc5b14c993ce95958a0?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                     alt="Morning icon"
//                                     className="aspect-[0.97] w-[39px]"
//                                 />
//                                 <div className="flex-auto my-auto">
//                                     Good morning, John
//                                 </div>
//                             </div>
//                             <div className="flex gap-2.5 justify-between">
//                                 <div className="flex flex-col">
//                                     <div className="text-sm font-semibold tracking-normal leading-5 text-stone-300">
//                                         0xrxc.....d67579
//                                     </div>
//                                     <div className="flex gap-1 self-end mt-1 text-xs font-medium leading-4 text-lime-300">
//                                         <Icon
//                                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd67e188e90512330c5311438a3a296a7858022379237e8ae93d812f84009109?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                             alt="OVA icon"
//                                             className="aspect-[1.1] w-[11px]"
//                                         />
//                                         <div>2,000 &OVA</div>
//                                     </div>
//                                 </div>
//                                 <ProfileImage
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc6ae45895172d36360f57ed7f944e7c17da5cc9dc88d8dfbf1e2b18d027122b?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                     alt="User profile"
//                                 />
//                             </div>
//                         </header>
//                         <div className="max-md:max-w-full">
//                             <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                                 <aside className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
//                                     <div className="flex flex-col grow pt-8 pb-20 border-r border-l border-solid border-white border-opacity-10 max-md:mt-10 max-md:max-w-full">
//                                         <h1 className="mx-8 text-3xl font-semibold tracking-normal leading-7 text-white max-md:mr-2.5 max-md:max-w-full">
//                                             Settings
//                                         </h1>
//                                         <div className="flex gap-3.5 px-6 py-4 mx-8 mt-5 text-base font-medium text-white rounded-xl border border-solid border-white border-opacity-30 max-md:flex-wrap max-md:px-5 max-md:mr-2.5">
//                                             <Icon
//                                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/b56c2ed3f2a358fa1583f6819cd9531b8f3ef2f84620cf3eb406c7f645361fc6?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                 alt="Search icon"
//                                                 className="aspect-[0.96] w-[23px]"
//                                             />
//                                             <div className="flex-auto my-auto">
//                                                 Search settings
//                                             </div>
//                                         </div>
//                                         <section className="flex flex-col items-start px-8 py-5 mt-10 bg-zinc-900 max-md:px-5 max-md:max-w-full">
//                                             <h2 className="text-lg font-medium text-white capitalize">
//                                                 Personal info
//                                             </h2>
//                                             <p className="mt-2 text-sm leading-5 text-zinc-400">
//                                                 Update your information and
//                                                 details here
//                                             </p>
//                                         </section>
//                                         <div className="flex flex-col self-start mt-10 ml-9 text-lg font-medium text-white max-md:ml-2.5">
//                                             <SettingsSection
//                                                 title="Socials"
//                                                 description="Set your social profile to build trust and security"
//                                             />
//                                             <SettingsSection
//                                                 title="Experience"
//                                                 description="Set your work profile to build trust and security"
//                                             />
//                                             <SettingsSection
//                                                 title="Wallets"
//                                                 description="Update your wallet info and details here"
//                                             />
//                                             <SettingsSection
//                                                 title="Password"
//                                                 description="Make your account secure"
//                                             />
//                                         </div>
//                                     </div>
//                                 </aside>
//                                 <section className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full">
//                                     <div className="flex flex-col self-stretch px-5 my-auto max-md:mt-10 max-md:max-w-full">
//                                         <h2 className="text-3xl font-semibold tracking-normal leading-7 text-white max-md:max-w-full">
//                                             Personal info
//                                         </h2>
//                                         <p className="mt-2 text-xl tracking-normal leading-8 text-zinc-400 max-md:max-w-full">
//                                             Update your information and details
//                                             here
//                                         </p>
//                                         <div className="mt-14 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
//                                             <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                                                 <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
//                                                     <div className="flex grow justify-center items-center py-px max-md:mt-8">
//                                                         <img
//                                                             loading="lazy"
//                                                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f6e5c7565722f1b8f5ba35184f77c906f76fe1746715a1dee75c7e658473356?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                             alt="User avatar"
//                                                             className="aspect-square fill-[url('')_lightgray_50%_/_cover_no-repeat] w-[150px]"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
//                                                     <button className="flex flex-col justify-center self-stretch my-auto w-full text-xs font-semibold text-center text-white rounded-lg bg-neutral-800 max-md:mt-10">
//                                                         <div className="justify-center px-11 py-4 rounded border border-lime-300 border-solid max-md:px-5">
//                                                             Update picture
//                                                         </div>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <InputField
//                                             label="Display name"
//                                             value="Pancakeguy"
//                                         />
//                                         <InputField
//                                             label="Username"
//                                             value="@pancakeguy"
//                                         />
//                                         <div className="mt-7 text-base leading-7 text-zinc-400 max-md:max-w-full">
//                                             Email address
//                                         </div>
//                                         <div className="flex gap-5 py-3.5 pr-12 pl-6 mt-2 rounded-md border border-solid border-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
//                                             <div className="flex-auto my-auto text-lg tracking-normal leading-7 text-white">
//                                                 Johnson@email.com
//                                             </div>
//                                             <button className="justify-center px-5 py-3 text-xs font-medium leading-4 text-center bg-lime-300 rounded-sm text-zinc-950 max-md:px-5">
//                                                 Verify email
//                                             </button>
//                                         </div>
//                                         <div className="flex gap-1 justify-center self-start mt-2 text-sm leading-5 text-rose-300">
//                                             <Icon
//                                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d9d8adcd7e0d240a23f2088cd0ba40a12b112a7df743517ab8a592e534ac14f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                 alt="Warning icon"
//                                                 className="self-start w-[18px]"
//                                             />
//                                             <div>Verification required</div>
//                                         </div>
//                                         <InputField
//                                             label="Date of birth"
//                                             value=""
//                                             placeholder="dd/mm/yyyy"
//                                         />
//                                         <InputField
//                                             label="Location"
//                                             value=""
//                                             placeholder="ex. United states"
//                                         />
//                                         <InputField
//                                             label="Profession"
//                                             value=""
//                                             placeholder="ex. Software developer"
//                                         />
//                                         <img
//                                             loading="lazy"
//                                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/72aa8876-1a71-4f04-bf4d-af1c2764a1d5?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                             alt="Decorative border"
//                                             className="z-10 self-start mt-7 w-full rounded-md border border-solid aspect-[4.17] border-neutral-600 max-md:max-w-full"
//                                         />
//                                     </div>
//                                 </section>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }

// export default Settings;

// import * as React from "react";

// interface AvatarProps {
//     src: string;
//     alt: string;
//     className?: string;
// }

// const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => (
//     <img
//         loading="lazy"
//         src={src}
//         alt={alt}
//         className={`shrink-0 aspect-square ${className}`}
//     />
// );

// interface IconProps {
//     src: string;
//     alt: string;
//     className?: string;
// }

// const Icon: React.FC<IconProps> = ({ src, alt, className }) => (
//     <img
//         loading="lazy"
//         src={src}
//         alt={alt}
//         className={`shrink-0 my-auto ${className}`}
//     />
// );

// interface NavItemProps {
//     icon: string;
//     label: string;
//     isActive?: boolean;
// }

// const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false }) => (
//     <div
//         className={`flex gap-3.5 justify-center ${isActive ? "px-8 py-4 mt-14 w-full text-lg font-medium capitalize whitespace-nowrap bg-white rounded-[50px] text-neutral-900 max-md:px-5 max-md:mt-10" : "px-8 py-5 mt-5 text-lg tracking-normal leading-7 whitespace-nowrap text-zinc-400 max-md:px-5"}`}
//     >
//         <Icon src={icon} alt="" className="w-[22px]" />
//         <div>{label}</div>
//     </div>
// );

// interface UserInfoProps {
//     avatarSrc: string;
//     username: string;
//     balance: number;
// }

// const UserInfo: React.FC<UserInfoProps> = ({
//     avatarSrc,
//     username,
//     balance,
// }) => (
//     <div className="flex gap-2.5 justify-between mt-[962px] max-md:mt-10">
//         <Avatar src={avatarSrc} alt="User avatar" className="w-[60px]" />
//         <div className="flex flex-col justify-center my-auto">
//             <div className="text-lg font-semibold leading-5 text-white">
//                 {username}
//             </div>
//             <div className="flex gap-1 pr-3.5 mt-2.5 text-sm font-medium leading-5 text-stone-300">
//                 <div>{balance} &OVA</div>
//                 <Icon
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c9c5634002a01d50cb33a7315d38db9c4177808861517b8f554f5a8c9e91764?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                     alt="OVA icon"
//                     className="w-3.5"
//                 />
//             </div>
//         </div>
//     </div>
// );

// const navItems: NavItemProps[] = [
//     {
//         icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b992d6e403da23837114cabdc42099a65120cbef61eb0528fd54a7afc3982393?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//         label: "Home",
//         isActive: true,
//     },
//     {
//         icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b0f1503032fbc28859d722d10d6a714ba80403480300b8377a4db69f7cc38b5b?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//         label: "Discover",
//     },
//     {
//         icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b42f773f56d14a94e54910b0cb537914f85fcf096ab0a5dd33d769468e52364d?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//         label: "Profile",
//     },
// ];

// function Settings() {
//     return (
//         <div className="border-l border-solid bg-neutral-900 border-zinc-950 border-opacity-10">
//             <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                 <aside className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
//                     <div className="flex flex-col grow px-6 pt-8 pb-20 mx-auto w-full border-r border-solid bg-neutral-900 border-white border-opacity-10 max-md:px-5">
//                         <img
//                             loading="lazy"
//                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad767d760b53bc2275012c65a5fac7e8d3b20e66414643a7a2d32f70851e62d7?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                             alt="Logo"
//                             className="self-center max-w-full aspect-[5.26] w-[214px]"
//                         />
//                         {navItems.map((item) => (
//                             <NavItem key={item.label} {...item} />
//                         ))}
//                         <UserInfo
//                             avatarSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ecb59cf28b3b9f6f23ba29122f055f3c8b131b201ae06c7ff9af533d6e5d14c5?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                             username="0xru.....579"
//                             balance={2000}
//                         />
//                     </div>
//                 </aside>
//                 <main className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
//                     <div className="flex flex-col grow max-md:max-w-full">
//                         <header className="flex gap-5 justify-end items-start p-7 w-full border-b border-l border-solid bg-neutral-900 border-white border-opacity-10 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
//                             <div className="flex gap-2.5 text-2xl font-medium capitalize text-white text-opacity-80">
//                                 <Icon
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/5423eecec7dea52c1db2e5e544bde9ae6117fadc1803b23ced15055a2f75e410?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                     alt="Sun icon"
//                                     className="aspect-[0.97] w-[39px]"
//                                 />
//                                 <h1 className="flex-auto my-auto">
//                                     Good morning, John
//                                 </h1>
//                             </div>
//                             <div className="flex gap-2.5 justify-between">
//                                 <div className="flex flex-col">
//                                     <div className="text-sm font-semibold tracking-normal leading-5 text-stone-300">
//                                         0xrxc.....d67579
//                                     </div>
//                                     <div className="flex gap-1 self-end mt-1 text-xs font-medium leading-4 text-lime-300">
//                                         <Icon
//                                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/02affa572dcd9a861d4f8ddf9f98ca94553038bcc87247e204b85c7f7f8e559f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                             alt="OVA icon"
//                                             className="aspect-[1.1] w-[11px]"
//                                         />
//                                         <div>2,000 &OVA</div>
//                                     </div>
//                                 </div>
//                                 <Avatar
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc6ae45895172d36360f57ed7f944e7c17da5cc9dc88d8dfbf1e2b18d027122b?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                     alt="User avatar"
//                                     className="self-start w-[37px]"
//                                 />
//                             </div>
//                         </header>
//                         <div className="max-md:max-w-full">
//                             <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                                 <nav className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
//                                     <div className="flex flex-col grow pt-8 pb-20 border-r border-l border-solid border-white border-opacity-10 max-md:mt-10 max-md:max-w-full">
//                                         <h2 className="mx-8 text-3xl font-semibold tracking-normal leading-7 text-white max-md:mr-2.5 max-md:max-w-full">
//                                             Settings
//                                         </h2>
//                                         <div className="flex gap-3.5 px-6 py-4 mx-8 mt-5 text-base font-medium text-white rounded-xl border border-solid border-white border-opacity-30 max-md:flex-wrap max-md:px-5 max-md:mr-2.5">
//                                             <Icon
//                                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2ae925e673d94eab8f9d7bf2066e865d5f51bd4f4ff0b135da95abcfe454b70?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                 alt="Search icon"
//                                                 className="aspect-[0.96] w-[23px]"
//                                             />
//                                             <div className="flex-auto my-auto">
//                                                 Search settings
//                                             </div>
//                                         </div>
//                                         <section className="flex flex-col items-start px-8 py-5 mt-10 bg-zinc-900 max-md:px-5 max-md:max-w-full">
//                                             <h3 className="text-lg font-medium text-white capitalize">
//                                                 Personal info
//                                             </h3>
//                                             <p className="mt-2 text-sm leading-5 text-zinc-400">
//                                                 Update your information and
//                                                 details here
//                                             </p>
//                                         </section>
//                                         <section className="flex flex-col self-start mt-10 ml-9 text-lg font-medium text-white max-md:ml-2.5">
//                                             <h3 className="capitalize">
//                                                 Socials
//                                             </h3>
//                                             <p className="mt-2 text-sm leading-5 text-zinc-400">
//                                                 Set your social profile to build
//                                                 trust and security
//                                             </p>
//                                             <h3 className="mt-14 capitalize max-md:mt-10 max-md:mr-1.5">
//                                                 Experience
//                                             </h3>
//                                             <p className="mt-2 text-sm leading-5 text-zinc-400 max-md:mr-1.5">
//                                                 Set your work profile to build
//                                                 trust and security
//                                             </p>
//                                             <h3 className="self-start mt-14 capitalize max-md:mt-10">
//                                                 Wallets
//                                             </h3>
//                                             <p className="self-start mt-2 text-sm leading-5 text-zinc-400">
//                                                 Update your wallet info and
//                                                 details here
//                                             </p>
//                                             <h3 className="self-start mt-14 capitalize max-md:mt-10">
//                                                 Password
//                                             </h3>
//                                             <p className="self-start mt-2 text-sm leading-5 text-zinc-400">
//                                                 Make your account secure
//                                             </p>
//                                         </section>
//                                     </div>
//                                 </nav>
//                                 <div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full">
//                                     <section className="flex flex-col px-5 mt-8 max-md:mt-10 max-md:max-w-full">
//                                         <h2 className="text-3xl font-semibold tracking-normal leading-7 text-white max-md:max-w-full">
//                                             Personal info
//                                         </h2>
//                                         <p className="mt-2 text-xl tracking-normal leading-8 text-zinc-400 max-md:max-w-full">
//                                             Update your information and details
//                                             here
//                                         </p>
//                                         <div className="mt-14 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
//                                             <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                                                 <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
//                                                     <div className="flex grow justify-center items-center py-px max-md:mt-8">
//                                                         <img
//                                                             loading="lazy"
//                                                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd59fabd5180b55d3567ac9c4026eb39b165cc131ed4415ddd695d09535fbf74?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                             alt="User avatar"
//                                                             className="aspect-square fill-[url('')_lightgray_50%_/_cover_no-repeat] w-[150px]"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
//                                                     <button className="flex flex-col justify-center self-stretch my-auto w-full text-xs font-semibold text-center text-white rounded-lg bg-neutral-800 max-md:mt-10">
//                                                         <span className="justify-center px-11 py-4 rounded border border-lime-300 border-solid max-md:px-5">
//                                                             Update picture
//                                                         </span>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <label
//                                             htmlFor="displayName"
//                                             className="mt-11 text-base leading-7 text-zinc-400 max-md:mt-10 max-md:max-w-full"
//                                         >
//                                             Display name
//                                         </label>
//                                         <div
//                                             id="displayName"
//                                             className="justify-center items-start p-5 mt-2 text-lg tracking-normal leading-7 text-white whitespace-nowrap rounded-md border border-solid border-neutral-600 max-md:px-5 max-md:max-w-full"
//                                         >
//                                             Pancakeguy
//                                         </div>
//                                         <label
//                                             htmlFor="username"
//                                             className="mt-7 text-base leading-7 text-zinc-400 max-md:max-w-full"
//                                         >
//                                             Username
//                                         </label>
//                                         <div
//                                             id="username"
//                                             className="justify-center items-start p-5 mt-2 text-lg tracking-normal leading-7 text-white whitespace-nowrap rounded-md border border-solid border-neutral-600 max-md:px-5 max-md:max-w-full"
//                                         >
//                                             @pancakeguy
//                                         </div>
//                                         <label
//                                             htmlFor="email"
//                                             className="mt-7 text-base leading-7 text-zinc-400 max-md:max-w-full"
//                                         >
//                                             Email address
//                                         </label>
//                                         <div
//                                             id="email"
//                                             className="flex gap-5 py-4 pr-12 pl-5 mt-2 w-full text-white whitespace-nowrap rounded-md border border-solid border-neutral-600 max-md:flex-wrap max-md:pr-5 max-md:max-w-full"
//                                         >
//                                             <div className="flex-auto my-auto text-lg tracking-normal leading-7">
//                                                 Johnson@email.com
//                                             </div>
//                                             <div className="flex gap-2 text-base tracking-tight leading-5 text-center">
//                                                 <div>Verified</div>
//                                                 <Icon
//                                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/d070d59c869f6db31a53fbbc1081907786e067c0fa30e0dca14155ea26a513ae?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                     alt="Checkmark icon"
//                                                     className="w-6"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <label
//                                             htmlFor="dob"
//                                             className="mt-7 text-base leading-7 text-zinc-400 max-md:max-w-full"
//                                         >
//                                             Date of birth
//                                         </label>
//                                         <div
//                                             id="dob"
//                                             className="flex flex-col justify-center items-start px-6 py-4 mt-2 text-lg tracking-normal leading-7 whitespace-nowrap rounded-md border border-solid border-neutral-600 text-zinc-500 max-md:px-5 max-md:max-w-full"
//                                         >
//                                             <div className="flex gap-2">
//                                                 <Icon
//                                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8640085591ca102c3a77da61a60ae83dd7487587ef6bdfac88ef6fac3d59f04?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                     alt="Calendar icon"
//                                                     className="my-auto w-6"
//                                                 />
//                                                 <div>dd/mm/yyyy</div>
//                                             </div>
//                                         </div>
//                                         <label
//                                             htmlFor="location"
//                                             className="mt-7 text-base leading-7 text-zinc-400 max-md:max-w-full"
//                                         >
//                                             Location
//                                         </label>
//                                         <div
//                                             id="location"
//                                             className="justify-center items-start px-5 py-6 mt-2 text-lg tracking-normal leading-7 rounded-md border border-solid border-neutral-600 text-zinc-500 max-md:px-5 max-md:max-w-full"
//                                         >
//                                             ex. United states
//                                         </div>
//                                         <label
//                                             htmlFor="profession"
//                                             className="mt-7 text-base leading-7 text-zinc-400 max-md:max-w-full"
//                                         >
//                                             Profession
//                                         </label>
//                                         <div
//                                             id="profession"
//                                             className="justify-center items-start px-5 py-5 mt-2 text-lg tracking-normal leading-7 rounded-md border border-solid border-neutral-600 text-zinc-500 max-md:px-5 max-md:max-w-full"
//                                         >
//                                             ex. Software developer
//                                         </div>
//                                         <img
//                                             loading="lazy"
//                                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/02aa55a3-7fe0-413a-86c5-a68d561c7832?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                             alt="Decorative border"
//                                             className="z-10 self-start mt-7 w-full rounded-md border border-solid aspect-[3.7] border-neutral-600 max-md:max-w-full"
//                                         />
//                                     </section>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }

// export default Settings;

import * as React from "react";

interface AvatarProps {
    src: string;
    alt: string;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => (
    <img
        loading="lazy"
        src={src}
        alt={alt}
        className={`shrink-0 aspect-square ${className}`}
    />
);

interface IconProps {
    src: string;
    alt: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ src, alt, className }) => (
    <img
        loading="lazy"
        src={src}
        alt={alt}
        className={`shrink-0 my-auto ${className}`}
    />
);

interface NavItemProps {
    icon: string;
    label: string;
    active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => (
    <div
        className={`flex gap-3.5 justify-center ${active ? "px-8 py-4 mt-14 w-full text-lg font-medium capitalize whitespace-nowrap bg-white rounded-[50px] text-neutral-900 max-md:px-5 max-md:mt-10" : "px-8 py-5 mt-5 text-lg tracking-normal leading-7 whitespace-nowrap text-zinc-400 max-md:px-5"}`}
    >
        <Icon src={icon} alt="" className="w-[22px] aspect-square" />
        <div>{label}</div>
    </div>
);

interface SettingsItemProps {
    title: string;
    description: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ title, description }) => (
    <div className="flex flex-col self-start mt-14 ml-8 max-md:ml-2.5 max-md:mt-10">
        <div className="text-lg font-medium text-white capitalize">{title}</div>
        <div className="mt-2 text-sm leading-5 text-zinc-400 max-md:mr-1.5">
            {description}
        </div>
    </div>
);

const Settings: React.FC = () => {
    return (
        <div className="border-l border-solid bg-neutral-900 border-zinc-950 border-opacity-10">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <aside className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow px-6 pt-8 pb-20 mx-auto w-full border-r border-solid bg-neutral-900 border-white border-opacity-10 max-md:px-5">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/339338f4c3d8be2d9ffa6c3a4164df9c3638123156ba9ecd7b5455509c1374d7?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                            alt="Logo"
                            className="self-center max-w-full aspect-[5.26] w-[214px]"
                        />
                        <nav>
                            <NavItem
                                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/62996345261963e762c2dbdf34d31adce7b41a19f2151c5a25478d49839c1a64?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                label="Home"
                                active
                            />
                            <NavItem
                                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b0f1503032fbc28859d722d10d6a714ba80403480300b8377a4db69f7cc38b5b?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                label="Discover"
                            />
                            <NavItem
                                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b42f773f56d14a94e54910b0cb537914f85fcf096ab0a5dd33d769468e52364d?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                label="Profile"
                            />
                        </nav>
                        <div className="flex gap-2.5 justify-between mt-[962px] max-md:mt-10">
                            <Avatar
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecb59cf28b3b9f6f23ba29122f055f3c8b131b201ae06c7ff9af533d6e5d14c5?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                alt="User avatar"
                                className="w-[60px]"
                            />
                            <div className="flex flex-col justify-center my-auto">
                                <div className="text-lg font-semibold leading-5 text-white">
                                    0xru.....579
                                </div>
                                <div className="flex gap-1 pr-3.5 mt-2.5 text-sm font-medium leading-5 text-stone-300">
                                    <div>2,000 &OVA</div>
                                    <Icon
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c9c5634002a01d50cb33a7315d38db9c4177808861517b8f554f5a8c9e91764?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                        alt=""
                                        className="w-3.5 aspect-square"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                <main className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
                    <header className="flex gap-5 justify-end items-start p-7 w-full border-b border-l border-solid bg-neutral-900 border-white border-opacity-10 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                        <div className="flex gap-2.5 text-2xl font-medium capitalize text-white text-opacity-80">
                            <Icon
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee077b327a4dd827ece2c23a52502855ba04d6b4f0adb424c0f45cb53982faba?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                alt=""
                                className="w-[39px] aspect-[0.97]"
                            />
                            <h1 className="flex-auto my-auto">
                                Good morning, John
                            </h1>
                        </div>
                        <div className="flex gap-2.5 justify-between">
                            <div className="flex flex-col">
                                <div className="text-sm font-semibold tracking-normal leading-5 text-stone-300">
                                    0xrxc.....d67579
                                </div>
                                <div className="flex gap-1 self-end mt-1 text-xs font-medium leading-4 text-lime-300">
                                    <Icon
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/02affa572dcd9a861d4f8ddf9f98ca94553038bcc87247e204b85c7f7f8e559f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                        alt=""
                                        className="w-[11px] aspect-[1.1]"
                                    />
                                    <div>2,000 &OVA</div>
                                </div>
                            </div>
                            <Avatar
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc6ae45895172d36360f57ed7f944e7c17da5cc9dc88d8dfbf1e2b18d027122b?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                alt="User avatar"
                                className="w-[37px]"
                            />
                        </div>
                    </header>
                    <div className="max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <aside className="flex flex-col w-[35%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow pt-8 pb-20 border-r border-l border-solid border-white border-opacity-10 max-md:max-w-full">
                                    <h2 className="mx-8 text-3xl font-semibold tracking-normal leading-7 text-white max-md:mr-2.5 max-md:max-w-full">
                                        Settings
                                    </h2>
                                    <div className="flex gap-3.5 px-5 py-4 mx-8 mt-5 text-base font-medium text-white rounded-xl border border-solid border-white border-opacity-30 max-md:flex-wrap max-md:px-5 max-md:mr-2.5">
                                        <Icon
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce18341bea139376472bae05b06fef6ae46adb09a40f19651f321f994620372a?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                            alt=""
                                            className="w-[23px] aspect-[0.96]"
                                        />
                                        <div className="flex-auto my-auto">
                                            Search settings
                                        </div>
                                    </div>
                                    <section className="flex flex-col items-start px-8 py-5 mt-10 bg-zinc-900 max-md:px-5 max-md:max-w-full">
                                        <h3 className="text-lg font-medium text-white capitalize">
                                            Personal info
                                        </h3>
                                        <p className="mt-2 text-sm leading-5 text-zinc-400">
                                            Update your information and details
                                            here
                                        </p>
                                    </section>
                                    <SettingsItem
                                        title="Socials"
                                        description="Set your social profile to build trust and security"
                                    />
                                    <SettingsItem
                                        title="Experience"
                                        description="Set your work profile to build trust and security"
                                    />
                                    <SettingsItem
                                        title="Wallets"
                                        description="Update your wallet info and details here"
                                    />
                                    <SettingsItem
                                        title="Password"
                                        description="Make your account secure"
                                    />
                                </div>
                            </aside>
                            <div className="flex flex-col ml-5 w-[65%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow px-5 mt-8 max-md:max-w-full">
                                    <h2 className="mr-16 ml-16 text-3xl font-semibold tracking-normal leading-7 text-white max-md:mr-2.5 max-md:max-w-full">
                                        Personal info
                                    </h2>
                                    <p className="mt-2 mr-16 ml-16 text-xl tracking-normal leading-8 text-zinc-400 max-md:mr-2.5 max-md:max-w-full">
                                        Update your information and details here
                                    </p>
                                    <div className="self-center mt-14 max-w-full w-[776px] max-md:pr-5 max-md:mt-10">
                                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                                                <div className="flex justify-center items-center py-px max-md:mt-8">
                                                    <img
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f7afcc3de3d40540cfb2cedb4802937c844d41b92d3988c4ecae62d98ee066c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                                        alt="User avatar"
                                                        className="aspect-square w-[150px]"
                                                    />
                                                    {/*fill-[url('')_lightgray_50%_/_cover_no-repeat]*/}
                                                </div>
                                            </div>
                                            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                                                <button className="flex flex-col justify-center self-stretch my-auto w-full text-xs font-semibold text-center text-white rounded-lg bg-neutral-800 max-md:mt-10">
                                                    <div className="justify-center px-11 py-4 rounded border border-lime-300 border-solid max-md:px-5">
                                                        Update picture
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-11 mr-16 ml-16 text-base leading-7 text-zinc-400 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                                        Full name
                                    </div>
                                    <div className="justify-center items-start self-center px-5 py-6 mt-2 max-w-full text-lg tracking-normal leading-7 text-white rounded-md border border-solid border-neutral-600 w-[776px] max-md:px-5">
                                        Johnson James
                                    </div>
                                    <div className="mt-7 mr-16 ml-16 text-base leading-7 text-zinc-400 max-md:mr-2.5 max-md:max-w-full">
                                        Email address
                                    </div>
                                    <div className="flex gap-5 self-center px-4 py-3.5 mt-2 max-w-full rounded-md border border-solid border-neutral-600 w-[776px] max-md:flex-wrap max-md:pl-5">
                                        <div className="flex-auto my-auto text-lg tracking-normal leading-7 text-white">
                                            Johnson@email.com
                                        </div>
                                        <button className="justify-center px-5 py-3 text-xs font-medium leading-4 text-center bg-lime-300 rounded-sm text-zinc-950 max-md:px-5">
                                            Verify email
                                        </button>
                                    </div>
                                    <div className="flex gap-1 justify-center self-start mt-2 ml-16 text-sm leading-5 text-rose-300 max-md:ml-2.5">
                                        <Icon
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d9d8adcd7e0d240a23f2088cd0ba40a12b112a7df743517ab8a592e534ac14f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                            alt=""
                                            className="w-[18px] aspect-square"
                                        />
                                        <div>Verification required</div>
                                    </div>
                                    <div className="mt-7 mr-16 ml-16 text-base leading-7 text-zinc-400 max-md:mr-2.5 max-md:max-w-full">
                                        Date of birth
                                    </div>
                                    <div className="flex flex-col justify-center items-start self-center px-5 py-4 mt-2 max-w-full text-lg tracking-normal leading-7 text-white whitespace-nowrap rounded-md border border-solid border-neutral-600 w-[776px] max-md:px-5">
                                        <div className="flex gap-2">
                                            <Icon
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8640085591ca102c3a77da61a60ae83dd7487587ef6bdfac88ef6fac3d59f04?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                                alt=""
                                                className="w-6 aspect-square"
                                            />
                                            <div>08/05/2024</div>
                                        </div>
                                    </div>
                                    <div className="mt-7 mr-16 ml-16 text-base leading-7 text-zinc-400 max-md:mr-2.5 max-md:max-w-full">
                                        Location
                                    </div>
                                    <div className="justify-center items-start self-center px-5 py-6 mt-2 max-w-full text-lg tracking-normal leading-7 text-white rounded-md border border-solid border-neutral-600 w-[776px] max-md:px-5">
                                        United states
                                    </div>
                                    <div className="mt-7 mr-16 ml-16 text-base leading-7 text-zinc-400 max-md:mr-2.5 max-md:max-w-full">
                                        Profession
                                    </div>
                                    <div className="justify-center items-start self-center px-5 py-5 mt-2 max-w-full text-lg tracking-normal leading-7 text-white rounded-md border border-solid border-neutral-600 w-[776px] max-md:px-5">
                                        Software developer
                                    </div>
                                    <div className="mt-7 mr-16 ml-16 text-base leading-7 text-zinc-400 max-md:mr-2.5 max-md:max-w-full">
                                        Bio
                                    </div>
                                    <div className="items-start self-center px-5 pt-5 pb-28 mt-2 max-w-full text-lg tracking-normal leading-7 text-white rounded-md border border-solid border-neutral-600 w-[776px] max-md:px-5">
                                        web3 enthusiast
                                    </div>
                                    <div className="flex flex-col justify-center px-16 py-10 mt-9 text-base font-semibold text-center border-t border-solid bg-zinc-900 border-neutral-700 max-md:px-5 max-md:max-w-full">
                                        <div className="flex gap-4 pl-20 mr-5 ml-6 max-md:flex-wrap max-md:pl-5 max-md:mr-2.5">
                                            <button className="flex flex-col justify-center text-white whitespace-nowrap">
                                                <div className="justify-center px-12 py-4 rounded border border-solid border-neutral-700 max-md:px-5">
                                                    Cancel
                                                </div>
                                            </button>
                                            <button className="flex flex-col justify-center text-zinc-950">
                                                <div className="justify-center px-6 py-4 bg-lime-300 rounded-md max-md:px-5">
                                                    Save changes
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
