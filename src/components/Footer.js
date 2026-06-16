import { assetPath } from '@/lib/utils';

export default function Footer() {
  return (
    <footer>
      <p>&copy; 2026 Everglow Global Co., Ltd. All rights reserved.</p>
      <div className="footer-links">
        <a href="https://www.facebook.com/people/Everglow-Travel/61580670863894/" target="_blank" rel="noopener noreferrer">
          <img src={assetPath('assets/images/facebook.png')} alt="fb" />
        </a>
        <a href="https://lin.ee/xXcNI1w" target="_blank" rel="noopener noreferrer">
          <img src={assetPath('assets/images/LINE.png')} alt="line" />
        </a>
        <a href="https://www.instagram.com/everglow_travel" target="_blank" rel="noopener noreferrer">
          <img src={assetPath('assets/images/ig.png')} alt="ig" />
        </a>
      </div>
    </footer>
  );
}
