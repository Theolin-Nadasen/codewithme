import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto p-8 bg-white text-gray-800">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-4">
          Welcome to Code With Me! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, you must not use our website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By creating an account, logging in, or using our services, you confirm that you have read, understood, and agreed to these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify or replace these Terms at any time. We will provide notice of significant changes by posting the new Terms on our website. Your continued use of the service after such changes constitutes your acceptance of the new Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>You must be at least [Minimum Age, e.g., 13 or 18] years old to use our services.</li>
          <li>You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account.</li>
          <li>You agree to provide accurate and complete information when creating your account.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Content and Conduct</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>You are solely responsible for any content you submit, post, or display on our platform.</li>
          <li>You agree not to post content that is illegal, offensive, harmful, or infringes on the rights of others.</li>
          <li>We reserve the right to remove any content that violates these Terms.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
        <p className="mb-4">
          All content on this website, including text, graphics, logos, and software, is our property or the property of our licensors and is protected by intellectual property laws.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by applicable law, Code With Me shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the service; (b) any conduct or content of any third party on the service; (c) any content obtained from the service; and (d) unauthorized access, use, or alteration of your transmissions or content.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed and construed in accordance with the law, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us.
        </p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
