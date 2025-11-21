// src/app/privacy-policy/page.tsx
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto p-8 bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">1. Introduction</h2>
        <p className="text-lg">
          Welcome to Code With Me. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">2. Information We Collect</h2>
        <h3 className="text-xl font-medium mb-2 text-blue-500">Personal Data:</h3>
        <p className="text-lg mb-2">
          While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
        </p>
        <ul className="list-disc list-inside text-lg ml-4">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Usage Data</li>
        </ul>
        <h3 className="text-xl font-medium mt-4 mb-2 text-blue-500">Usage Data:</h3>
        <p className="text-lg">
          We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">3. Use of Data</h2>
        <p className="text-lg">Code With Me uses the collected data for various purposes:</p>
        <ul className="list-disc list-inside text-lg ml-4">
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our Service</li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">4. Disclosure of Data</h2>
        <p className="text-lg">
          We may disclose your Personal Data in the good faith belief that such action is necessary to:
        </p>
        <ul className="list-disc list-inside text-lg ml-4">
          <li>To comply with a legal obligation</li>
          <li>To protect and defend the rights or property of Code With Me</li>
          <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
          <li>To protect the personal safety of users of the Service or the public</li>
          <li>To protect against legal liability</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">5. Security of Data</h2>
        <p className="text-lg">
          The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">6. Your Data Protection Rights</h2>
        <p className="text-lg">
          Depending on your location, you may have the following data protection rights: the right to access, update or to delete the information we have on you; the right of rectification; the right to object; the right of restriction; the right to data portability; the right to withdraw consent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">7. Changes to This Privacy Policy</h2>
        <p className="text-lg">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">8. Contact Us</h2>
        <p className="text-lg">
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
