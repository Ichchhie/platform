<?php

namespace Oro\Bundle\OrganizationBundle\Tests\Unit\Form\Type;

use Oro\Bundle\FormBundle\Form\Type\OroJquerySelect2HiddenType;
use Oro\Bundle\OrganizationBundle\Form\Type\OrganizationSelectType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class OrganizationSelectTypeTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var OrganizationSelectType
     */
    protected $type;

    /**
     * Setup test env
     */
    protected function setUp()
    {
        $this->type = new OrganizationSelectType();
    }

    public function testConfigureOptions()
    {
        /** @var OptionsResolver $resolver */
        $resolver = $this->createMock('Symfony\Component\OptionsResolver\OptionsResolver');
        $resolver->expects($this->once())
            ->method('setDefaults')
            ->with($this->isType('array'));
        $this->type->configureOptions($resolver);
    }

    public function testGetParent()
    {
        $this->assertEquals(OroJquerySelect2HiddenType::class, $this->type->getParent());
    }
}
