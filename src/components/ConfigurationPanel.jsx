
import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function ConfigurationPanel({ selectedNode, params, setParams, isMinimized, setIsMinimized }) {
    const [activeTab, setActiveTab] = useState('extract');
    const [transformSubtype, setTransformSubtype] = useState('');
    // const [isMinimized, setIsMinimized] = useState(false);
    const [formData, setFormData] = useState({});

    const nodeType = selectedNode?.type || '';
    const isExtract = nodeType === 'extract';
    const isTransform = nodeType === 'transform';
    const isLoad = nodeType === 'load';

    useEffect(() => {
        if (!selectedNode) {
            setIsMinimized(true);   // ✅ Auto-minimize when no node is selected
            setFormData({});
            return;
        }

        const nodeType = selectedNode.type;
        const savedParams = params[selectedNode.id] || {};
        setFormData(savedParams);

        if (nodeType === 'extract') setActiveTab('extract');
        else if (nodeType === 'transform') setActiveTab('transform');
        else if (nodeType === 'load') setActiveTab('load');

        setIsMinimized(false);    // ✅ Auto-expand when a node is selected
    }, [selectedNode, params]);


    const handleSave = () => {
        if (!selectedNode?.id) return;

        setParams((prev) => ({
            ...prev,
            [selectedNode.id]: formData
        }));

        console.log("✅ Saved params for node:", selectedNode.id, formData);
    };

    const tabClasses = (tab) =>
        `px-4 py-2 text-sm font-medium border-b-2 ${activeTab === tab
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-blue-500'
        }`;

    // useEffect(() => {
    //     if (!selectedNode) return;

    //     const nodeType = selectedNode.type;
    //     const savedParams = params[selectedNode.id] || {};
    //     setFormData(savedParams);

    //     if (nodeType === 'extract') setActiveTab('extract');
    //     else if (nodeType === 'transform') setActiveTab('transform');
    //     else if (nodeType === 'load') setActiveTab('load');
    // }, [selectedNode, params]);

    const renderExtractForm = () => (
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Database Name</label>
                {/* <input type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" /> */}
                <input
                    type="text"
                    value={formData.database_name || ''}
                    onChange={(e) => setFormData({ ...formData, database_name: e.target.value })}
                    className="..."
                />

            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Table Name</label>
                {/* <input type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" /> */}
                <input
                    type="text"
                    value={formData.table_name || ''}
                    onChange={(e) => setFormData({ ...formData, table_name: e.target.value })}
                    className="..."
                />
            </div>
            {/* <button type="button" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"> */}
            <button type="button"
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
                Save
            </button>
        </form>
    );

    const renderTransformForm = () => (
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Subtype</label>
                <select
                    value={transformSubtype}
                    onChange={(e) => setTransformSubtype(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="">Select subtype</option>
                    <option value="merge">Merge</option>
                </select>
            </div>

            {transformSubtype === 'merge' && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Table 1 Name</label>
                        {/* <input type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" /> */}
                        <input
                            type="text"
                            value={formData.table1_name || ''}
                            onChange={(e) => setFormData({ ...formData, table1_name: e.target.value })}
                            className="..."
                        />

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Column 1 Name</label>
                        {/* <input type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" /> */}
                        <input
                            type="text"
                            value={formData.col1 || ''}
                            onChange={(e) => setFormData({ ...formData, col1: e.target.value })}
                            className="..."
                        />
                    </div>
                    <div>

                        <label className="block text-sm font-medium text-gray-700">Table 2 Name</label>
                        {/* <input type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" /> */}
                        <input
                            type="text"
                            value={formData.table2_name || ''}
                            onChange={(e) => setFormData({ ...formData, table2_name: e.target.value })}
                            className="..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Column 2 Name</label>
                        {/* <input type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" /> */}
                        <input
                            type="text"
                            value={formData.col2 || ''}
                            onChange={(e) => setFormData({ ...formData, col2: e.target.value })}
                            className="..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Join Type</label>
                        {/* <select className="mt-1 w-full rounded-md border-gray-300 shadow-sm"> */}
                        <select
                            value={formData.join_type || ''}
                            onChange={(e) => setFormData({ ...formData, join_type: e.target.value })}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="inner">Inner</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="outer">Outer</option>
                        </select>
                    </div>
                </>
            )}


            <button
                type="button"
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
                Save
            </button>

        </form>
    );

    const renderLoadForm = () => (
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Database Name</label>
                {/* <input type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" /> */}
                <input
                    type="text"
                    value={formData.database_name || ''}
                    onChange={(e) => setFormData({ ...formData, database_name: e.target.value })}
                    className="..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Table Name</label>
                {/* <input type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" /> */}
                <input
                    type="text"
                    value={formData.table_name || ''}
                    onChange={(e) => setFormData({ ...formData, table_name: e.target.value })}
                    className="..."
                />
            </div>
            {/* <button type="button" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Save
            </button> */}
            <button
                type="button"
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
                Save
            </button>

        </form>
    );


    return (
        <div className={`absolute right-0 top-0 h-full bg-gray-100 border-l border-cyan-500 shadow-xl flex flex-col transition-all duration-300 ease-in-out ${isMinimized ? 'w-16' : 'w-full max-w-md'}`}>
            {/* Header with Tabs and Minimize Button */}
            
            <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50">
                {/* {!isMinimized && (
                    <div className="flex space-x-4">
                        <button className={tabClasses('extract')} onClick={() => setActiveTab('extract')}>Extract</button>
                        <button className={tabClasses('transform')} onClick={() => setActiveTab('transform')}>Transform</button>
                        <button className={tabClasses('load')} onClick={() => setActiveTab('load')}>Load</button>
                    </div>
                )} */}
                {/* <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-gray-500 hover:text-blue-500 text-xl font-bold"
                    title={isMinimized ? 'Expand panel' : 'Minimize panel'}
                >
                    {isMinimized ? '⮞' : '⮜'}
                </button> */}
                {/* <button
                    onClick={() => setIsMinimized(true)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                    title="Close configuration panel"
                >
                    <FaTimes />
                </button> */}
                <div className="flex items-center space-between justify-end h-full pr-4">
                    <span >Configuration Panel</span>
                    <button
                        onClick={() => setIsMinimized(true)}
                        className="text-gray-500 hover:text-red-500 text-xl"
                        title="Close configuration panel"
                    >
                        <FaTimes />
                    </button>
                </div>

            </div>

            {/* Form Content */}
            {!isMinimized && (
                <div className="p-6 flex-1 overflow-y-auto">

                    <div className="p-6 flex-1 overflow-y-auto">
                        {/* {activeTab === 'extract' && (
                            <div className={`${isExtract ? '' : 'pointer-events-none opacity-50'}`}>
                                {renderExtractForm()}
                            </div>
                        )}
                        {activeTab === 'transform' && (
                            <div className={`${isTransform ? '' : 'pointer-events-none opacity-50'}`}>
                                {renderTransformForm()}
                            </div>
                        )}
                        {activeTab === 'load' && (
                            <div className={`${isLoad ? '' : 'pointer-events-none opacity-50'}`}>
                                {renderLoadForm()}
                            </div>
                        )} */}
                        {isExtract && renderExtractForm()}
                        {isTransform && renderTransformForm()}
                        {isLoad && renderLoadForm()}
                    </div>

                </div>
            )}
        </div>
    );
}
