import { useEffect, useRef, FC, memo } from 'react';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

export interface CustomJSONEditorProps {
  value?: string;
  onChange?: () => void;
}

const defaultOptions: JSONEditorOptions = {
  language: 'en',
  mode: 'code',
  enableTransform: false,
};

const containerStyle = {
  height: '50vh',
};

const CustomJSONEditor: FC<CustomJSONEditorProps> = ({ value, onChange }) => {
  const containerRef = useRef(null);
  const editorRef = useRef<JSONEditor | null>(null);

  useEffect(() => {
    const options: JSONEditorOptions = {
      ...defaultOptions,
      onChangeText: onChange,
    };

    if (containerRef.current)
      editorRef.current = new JSONEditor(containerRef.current, options, value);

    return () => {
      editorRef.current && editorRef.current.destroy();
    };
  }, [containerRef]);

  useEffect(() => {
    editorRef?.current?.updateText(value || '');
  }, [value]);

  return <div style={containerStyle} ref={containerRef} />;
};

export default memo(CustomJSONEditor);